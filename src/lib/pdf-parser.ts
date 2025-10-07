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
  private dayRegex = /(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)/gi;
  private timeRangeRegex = /([0-9]{2}:[0-9]{2})\s*-\s*([0-9]{2}:[0-9]{2})/g;
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

      console.log('📄 Texte PDF extrait:', allText.substring(0, 500));
      
      const parsedCourses = this.parseScheduleFromText(allText);
      
      return {
        totalCourses: parsedCourses.length,
        courses: parsedCourses
      };
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Impossible d\'analyser le fichier PDF. Vérifiez que le format est correct.');
    }
  }

  private parseScheduleFromText(text: string): {
    day: string;
    time: string;
    subject: string;
    teacher: string;
    room: string;
  }[] {
    const courses: {
      day: string;
      time: string;
      subject: string;
      teacher: string;
      room: string;
    }[] = [];
    
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    let currentDay = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if line contains a day
      const dayMatch = line.match(this.dayRegex);
      if (dayMatch) {
        currentDay = this.normalizeDayName(dayMatch[0]);
        console.log('🗓️ Jour détecté:', currentDay);
        continue;
      }
      
      // Skip if no current day
      if (!currentDay) continue;
      
      // Check if line contains time range information
      const timeMatch = line.match(this.timeRangeRegex);
      if (timeMatch) {
        const startTime = timeMatch[1];
        const endTime = timeMatch[2];
        const timeString = `${startTime} - ${endTime}`;
        
        // Extract subject (text before the time or nearby)
        let subject = this.extractSubject(line, timeMatch[0]);
        
        // Extract teacher
        let teacher = this.extractTeacher(line);
        
        // Extract room
        let room = this.extractRoom(line);
        
        console.log('📚 Cours détecté:', { day: currentDay, time: timeString, subject, teacher, room });
        
        courses.push({
          day: currentDay,
          time: timeString,
          subject: subject || 'Matière inconnue',
          teacher: teacher || 'Professeur inconnu',
          room: room || 'Salle inconnue'
        });
      }
    }
    
    // If no courses found with the main parser, try alternative parsing
    if (courses.length === 0) {
      console.log('⚠️ Aucun cours trouvé avec le parser principal, tentative alternative...');
      return this.parseAlternativeFormat(text);
    }
    
    return courses;
  }

  private parseAlternativeFormat(text: string): {
    day: string;
    time: string;
    subject: string;
    teacher: string;
    room: string;
  }[] {
    const courses: {
      day: string;
      time: string;
      subject: string;
      teacher: string;
      room: string;
    }[] = [];
    
    // Try to find patterns like:
    // "Lundi 08:00-12:00 Mécanique M. Dupont Salle B2"
    const alternativeRegex = /(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)[\s\S]{0,50}?([0-9]{1,2}[:h][0-9]{2})\s*[-àa]\s*([0-9]{1,2}[:h][0-9]{2})/gi;
    
    let match;
    while ((match = alternativeRegex.exec(text)) !== null) {
      const day = this.normalizeDayName(match[1]);
      const startTime = this.normalizeTime(match[2]);
      const endTime = this.normalizeTime(match[3]);
      const time = `${startTime} - ${endTime}`;
      
      // Extract surrounding context
      const contextStart = Math.max(0, match.index - 50);
      const contextEnd = Math.min(text.length, match.index + match[0].length + 100);
      const context = text.substring(contextStart, contextEnd);
      
      const subject = this.extractSubject(context, match[0]) || 'Matière inconnue';
      const teacher = this.extractTeacher(context) || 'Professeur inconnu';
      const room = this.extractRoom(context) || 'Salle inconnue';
      
      courses.push({ day, time, subject, teacher, room });
    }
    
    return courses;
  }

  private normalizeDayName(day: string): string {
    const dayMap: { [key: string]: string } = {
      'lundi': 'Lundi',
      'mardi': 'Mardi', 
      'mercredi': 'Mercredi',
      'jeudi': 'Jeudi',
      'vendredi': 'Vendredi',
      'samedi': 'Samedi',
      'dimanche': 'Dimanche'
    };
    
    return dayMap[day.toLowerCase()] || day;
  }

  private normalizeTime(time: string): string {
    // Convert various time formats to HH:MM
    let normalized = time.replace(/[h\.]/g, ':');
    
    if (!normalized.includes(':')) {
      normalized += ':00';
    }
    
    const parts = normalized.split(':');
    if (parts.length === 2) {
      const hours = parts[0].padStart(2, '0');
      const minutes = parts[1].padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    
    return time;
  }

  private extractSubject(text: string, timeString: string): string {
    // Remove the time string from text
    const beforeTime = text.split(timeString)[0].trim();
    const afterTime = text.split(timeString)[1]?.trim() || '';
    
    // Try to find subject in the text before time
    let subject = beforeTime
      .replace(/^(cours|matière|discipline)\s*/gi, '')
      .replace(/(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)/gi, '')
      .replace(/[0-9]{1,2}[:h.][0-9]{2}/g, '')
      .trim();
    
    // If subject is too short, try to get it from after the time
    if (subject.length < 3 && afterTime) {
      const words = afterTime.split(/\s+/);
      subject = words.slice(0, Math.min(4, words.length)).join(' ');
    }
    
    // Clean up subject
    subject = subject
      .replace(/\b(M\.|Mme|Mr|Mrs|Prof|Professeur)\b.*/gi, '')
      .replace(/\b(salle|room|local)\b.*/gi, '')
      .trim();
    
    // Take first meaningful phrase (max 5 words)
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
