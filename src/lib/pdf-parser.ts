import * as pdfjsLib from 'pdfjs-dist';
import { ParsedCourse } from '@/types/planning';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ParsedSchedule {
  totalCourses: number;
  courses: {
    day: string;
    time: string;
    subject: string;
    teacher: string;
    room: string;
  }[];
}

export class PDFParser {
  // Updated to support both full day names and abbreviated day names (Lu, Ma, Me, Je, Ve)
  private dayRegex = /(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche|Lu|Ma|Me|Je|Ve|Sa|Di)/gi;
  private dayAbbreviations: { [key: string]: string } = {
    'lu': 'Lundi',
    'ma': 'Mardi',
    'me': 'Mercredi',
    'je': 'Jeudi',
    've': 'Vendredi',
    'sa': 'Samedi',
    'di': 'Dimanche'
  };

  private timeRangeRegex = /([0-9]{1,2}[:h.][0-9]{2})\s*-\s*([0-9]{1,2}[:h.][0-9]{2})/g;
  private roomRegex = /\b(salle|room|local)\s*([A-Za-z0-9\-]+)\b/gi;
  private teacherRegex = /\b(M\.|Mme|Mr|Mrs|Prof|Professeur)\s*([A-Za-z\s\-éèêàâùû]+)/gi;

  async parsePDF(file: File): Promise<ParsedSchedule> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      
      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }
      
      return this.parseScheduleText(fullText);
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw error;
    }
  }

  private parseScheduleText(text: string): ParsedSchedule {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const courses: ParsedSchedule['courses'] = [];
    
    let currentDay = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check for day names
      const dayMatch = line.match(this.dayRegex);
      if (dayMatch) {
        const foundDay = dayMatch[0].toLowerCase();
        // If it's an abbreviation, expand it
        currentDay = this.dayAbbreviations[foundDay] || dayMatch[0];
      }
      
      // Look for time ranges
      const timeMatches = [...line.matchAll(this.timeRangeRegex)];
      if (timeMatches.length > 0 && currentDay) {
        for (const timeMatch of timeMatches) {
          const timeRange = `${timeMatch[1]} - ${timeMatch[2]}`;
          
          // Extract subject, teacher, and room from surrounding context
          const context = line + ' ' + (lines[i + 1] || '');
          const subject = this.extractSubject(context);
          const teacher = this.extractTeacher(context);
          const room = this.extractRoom(context);
          
          if (subject) {
            courses.push({
              day: currentDay,
              time: timeRange,
              subject,
              teacher,
              room
            });
          }
        }
      }
    }
    
    return {
      totalCourses: courses.length,
      courses
    };
  }

  private extractSubject(text: string): string {
    // Remove day names, times, and other metadata to isolate the subject
    let subject = text
      .replace(this.dayRegex, '')
      .replace(this.timeRangeRegex, '')
      .replace(/[0-9]{1,2}[:h.][0-9]{2}/g, '')
      .trim();
    
    // If subject contains teacher or room info, extract only the part before
    const teacherMatch = subject.match(/(M\.|Mme|Mr|Mrs|Prof|Professeur)/i);
    if (teacherMatch) {
      subject = subject.substring(0, teacherMatch.index).trim();
    }
    
    const roomMatch = subject.match(/(salle|room|local|\b[A-Z][0-9]+\b)/i);
    if (roomMatch) {
      subject = subject.substring(0, roomMatch.index).trim();
    }
    
    // Clean up and take first few words
    const words = subject.split(/\s+/).filter(w => w.length > 0);
    if (words.length > 0) {
      return words.slice(0, Math.min(5, words.length)).join(' ');
    }
    
    return '';
  }

  private extractTeacher(text: string): string {
    const teacherMatch = text.match(this.teacherRegex);
    if (teacherMatch) {
      return teacherMatch[0].trim();
    }
    
    // Look for common name patterns
    const namePattern = /\b[A-Z][a-zéèêàâùû]+\s+[A-Z][a-zéèêàâùû]+\b/g;
    const nameMatch = text.match(namePattern);
    if (nameMatch && nameMatch.length > 0) {
      return nameMatch[0];
    }
    
    return '';
  }

  private extractRoom(text: string): string {
    const roomMatch = text.match(this.roomRegex);
    if (roomMatch) {
      return roomMatch[2]?.trim() || roomMatch[0].trim();
    }
    
    // Look for room-like patterns
    const roomPattern = /\b([A-Z]?[0-9]{1,3}[A-Z]?|Atelier\s*[0-9]+|Lab\s*[0-9]+|Salle\s*[A-Za-z0-9]+)\b/gi;
    const roomPatternMatch = text.match(roomPattern);
    if (roomPatternMatch && roomPatternMatch.length > 0) {
      return roomPatternMatch[0];
    }
    
    return '';
  }
}

// Export a standalone function for convenience
export async function parsePDF(file: File): Promise<ParsedSchedule> {
  const parser = new PDFParser();
  return parser.parsePDF(file);
}
