import * as pdfjsLib from 'pdfjs-dist';
import { CourseData } from '@/components/planning/SmartPlanningIntelligent';

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
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let allText = '';
      
      // Extract text from all pages
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        allText += pageText + '\n';
      }

      console.log('Extracted text from PDF:', allText);
      
      // Try main parser first
      const courses = this.extractCourses(allText);
      
      // If no courses found, try alternative parser for AFP format
      if (courses.length === 0) {
        console.warn('Aucun cours trouvé avec le parser principal, tentative alternative...');
        return this.alternativeParser(allText);
      }
      
      return {
        totalCourses: courses.length,
        courses,
      };
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw error;
    }
  }

  private extractCourses(text: string): any[] {
    const courses: any[] = [];
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    let currentDay = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if line contains a day
      const dayMatch = line.match(this.dayRegex);
      if (dayMatch) {
        const day = dayMatch[0].toLowerCase();
        // Convert abbreviated day to full name
        currentDay = this.dayAbbreviations[day] || dayMatch[0];
      }
      
      // Try to extract course information from the line
      const timeMatch = line.match(this.timeRangeRegex);
      
      if (currentDay && (timeMatch || this.looksLikeCourse(line))) {
        const course = {
          day: currentDay,
          time: timeMatch ? `${timeMatch[1]} - ${timeMatch[2]}` : 'N/A',
          subject: this.extractSubject(line),
          teacher: this.extractTeacher(line),
          room: this.extractRoom(line),
        };
        
        // Only add if we found meaningful information
        if (course.subject || course.teacher || course.room) {
          courses.push(course);
        }
      }
    }
    
    return courses;
  }

  // Alternative parser for AFP format (horizontal layout with abbreviated days)
  private alternativeParser(text: string): ParsedSchedule {
    const courses: any[] = [];
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    // Pattern: subject - teacher - room (without explicit time)
    const altRegex = /([A-Za-zÀ-ÿ\s]{3,})\s*-\s*([A-Za-zÀ-ÿ\s]+)\s*-\s*([A-Z0-9]+)/g;
    
    // Pattern: day + date + content
    const dayDatePattern = /(Lu|Ma|Me|Je|Ve|Sa|Di)\s+(\d+)\s+([^\n]+)/gi;
    
    let match;
    while ((match = dayDatePattern.exec(text)) !== null) {
      const [, dayAbbr, date, content] = match;
      const day = this.dayAbbreviations[dayAbbr.toLowerCase()] || dayAbbr;
      
      // Try to extract course info from content
      const subject = this.extractSubject(content);
      const teacher = this.extractTeacher(content);
      const room = this.extractRoom(content);
      
      if (subject || teacher || room) {
        courses.push({
          day,
          time: 'N/A',
          subject: subject || 'Non spécifié',
          teacher: teacher || '',
          room: room || '',
        });
      }
    }
    
    // If still no courses, try simple pattern matching
    if (courses.length === 0) {
      let currentDay = '';
      
      for (const line of lines) {
        // Check for day abbreviations
        const dayMatch = line.match(/(Lu|Ma|Me|Je|Ve|Sa|Di)\s+(\d+)/i);
        if (dayMatch) {
          currentDay = this.dayAbbreviations[dayMatch[1].toLowerCase()] || dayMatch[1];
        }
        
        // Look for content that might be a course
        if (currentDay && line.length > 10 && !line.includes('Formation') && !line.includes('Planning')) {
          const subject = this.extractSubject(line);
          const teacher = this.extractTeacher(line);
          const room = this.extractRoom(line);
          
          if (subject || teacher || room) {
            courses.push({
              day: currentDay,
              time: 'N/A',
              subject: subject || line.trim().substring(0, 50),
              teacher: teacher || '',
              room: room || '',
            });
          }
        }
      }
    }
    
    console.log(`Alternative parser found ${courses.length} courses`);
    
    return {
      totalCourses: courses.length,
      courses,
    };
  }

  private looksLikeCourse(line: string): boolean {
    // A line looks like a course if it has teacher or room indicators
    return this.teacherRegex.test(line) || this.roomRegex.test(line) || /[A-Z][0-9]+/.test(line);
  }

  private extractSubject(text: string): string {
    // Remove days, times, teachers, and rooms to isolate the subject
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
