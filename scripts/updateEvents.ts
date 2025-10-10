#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { JSDOM } from 'jsdom';

interface Event {
  title: string;
  date: string;
  location: string;
  category: string;
  source: string;
}

class EventScraper {
  private events: Event[] = [];

  private async fetchHTML(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      https.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
  }

  private async scrapeFHPressroom(): Promise<void> {
    try {
      console.log('📅 Scraping FH Pressroom...');
      const html = await this.fetchHTML('https://www.fh-pressroom.ch/fr/agenda');
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      const eventElements = document.querySelectorAll('.agenda-item, .event-item, .agenda-event, .event, article');
      
      eventElements.forEach((element) => {
        const titleEl = element.querySelector('h1, h2, h3, h4, .title, .event-title, .agenda-title');
        const dateEl = element.querySelector('.date, .event-date, .agenda-date, time');
        const locationEl = element.querySelector('.location, .venue, .place, .event-location');
        
        if (titleEl && dateEl) {
          this.events.push({
            title: titleEl.textContent?.trim() || 'Événement horloger',
            date: dateEl.textContent?.trim() || '',
            location: locationEl?.textContent?.trim() || 'Suisse',
            category: 'Événement officiel',
            source: 'fh-pressroom.ch'
          });
        }
      });
      
      console.log(`✅ FH Pressroom: ${eventElements.length} événements trouvés`);
    } catch (error) {
      console.error('❌ Erreur lors du scraping FH Pressroom:', error);
    }
  }

  private async scrapeHauteHorlogerie(): Promise<void> {
    try {
      console.log('📅 Scraping Haute Horlogerie...');
      const html = await this.fetchHTML('https://www.hautehorlogerie.org/fr/actualites/');
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      const eventElements = document.querySelectorAll('.news-item, .article, .event-item, .actualite');
      
      eventElements.forEach((element) => {
        const titleEl = element.querySelector('h1, h2, h3, h4, .title, .article-title');
        const dateEl = element.querySelector('.date, .published-date, time, .meta-date');
        const contentEl = element.querySelector('.content, .description, .excerpt');
        
        if (titleEl && this.isEventRelated(titleEl.textContent || '')) {
          this.events.push({
            title: titleEl.textContent?.trim() || 'Actualité horlogère',
            date: dateEl?.textContent?.trim() || new Date().toLocaleDateString('fr-FR'),
            location: this.extractLocation(contentEl?.textContent || '') || 'International',
            category: 'Actualité',
            source: 'hautehorlogerie.org'
          });
        }
      });
      
      console.log(`✅ Haute Horlogerie: ${eventElements.length} actualités trouvées`);
    } catch (error) {
      console.error('❌ Erreur lors du scraping Haute Horlogerie:', error);
    }
  }

  private async scrapeBHI(): Promise<void> {
    try {
      console.log('📅 Scraping BHI Events...');
      const html = await this.fetchHTML('https://www.bhi.co.uk/horology-events/');
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      const eventElements = document.querySelectorAll('.event, .event-item, .upcoming-event, article, .post');
      
      eventElements.forEach((element) => {
        const titleEl = element.querySelector('h1, h2, h3, h4, .title, .event-title, .entry-title');
        const dateEl = element.querySelector('.date, .event-date, time, .meta-date');
        const locationEl = element.querySelector('.location, .venue, .event-location');
        
        if (titleEl) {
          this.events.push({
            title: titleEl.textContent?.trim() || 'BHI Event',
            date: dateEl?.textContent?.trim() || '',
            location: locationEl?.textContent?.trim() || 'United Kingdom',
            category: 'Formation/Education',
            source: 'bhi.co.uk'
          });
        }
      });
      
      console.log(`✅ BHI: ${eventElements.length} événements trouvés`);
    } catch (error) {
      console.error('❌ Erreur lors du scraping BHI:', error);
    }
  }

  private async scrapeWatchesAndWonders(): Promise<void> {
    try {
      console.log('📅 Scraping Watches & Wonders...');
      const html = await this.fetchHTML('https://www.watchesandwonders.com/fr/evenements');
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      const eventElements = document.querySelectorAll('.event, .event-card, .salon-info, .exhibition');
      
      eventElements.forEach((element) => {
        const titleEl = element.querySelector('h1, h2, h3, h4, .title, .event-title');
        const dateEl = element.querySelector('.date, .event-date, time, .dates');
        const locationEl = element.querySelector('.location, .venue, .city, .place');
        
        if (titleEl) {
          this.events.push({
            title: titleEl.textContent?.trim() || 'Watches & Wonders',
            date: dateEl?.textContent?.trim() || '',
            location: locationEl?.textContent?.trim() || 'Genève, Suisse',
            category: 'Salon',
            source: 'watchesandwonders.com'
          });
        }
      });
      
      console.log(`✅ Watches & Wonders: ${eventElements.length} événements trouvés`);
    } catch (error) {
      console.error('❌ Erreur lors du scraping Watches & Wonders:', error);
    }
  }

  private isEventRelated(title: string): boolean {
    const keywords = ['salon', 'exposition', 'événement', 'event', 'fair', 'show', 'exhibition', 'festival', 'concours', 'prix', 'award'];
    return keywords.some(keyword => title.toLowerCase().includes(keyword));
  }

  private extractLocation(text: string): string | null {
    const cities = ['Genève', 'Bâle', 'Paris', 'Londres', 'New York', 'Tokyo', 'Hong Kong', 'Zurich', 'Munich', 'Dubai'];
    for (const city of cities) {
      if (text.includes(city)) {
        return city;
      }
    }
    return null;
  }

  private deduplicateEvents(): void {
    const seen = new Set();
    this.events = this.events.filter(event => {
      const key = `${event.title}-${event.date}-${event.source}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private sortEventsByDate(): void {
    this.events.sort((a, b) => {
      // Simple date comparison - you might want to improve this with proper date parsing
      const dateA = new Date(a.date.replace(/[^\d\/\-\.]/g, '') || '2025-01-01');
      const dateB = new Date(b.date.replace(/[^\d\/\-\.]/g, '') || '2025-01-01');
      return dateA.getTime() - dateB.getTime();
    });
  }

  private async saveToJSON(): Promise<void> {
    try {
      const outputPath = path.join(__dirname, '..', 'public', 'data', 'events.json');
      const outputDir = path.dirname(outputPath);
      
      // Ensure directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const jsonData = {
        lastUpdated: new Date().toISOString(),
        totalEvents: this.events.length,
        events: this.events
      };
      
      fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
      console.log(`\n✅ Fichier events.json mis à jour avec ${this.events.length} événements`);
      console.log(`📁 Sauvegardé dans: ${outputPath}`);
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      throw error;
    }
  }

  public async scrapeAllEvents(): Promise<void> {
    console.log('🚀 Début du scraping des événements horlogers...');
    console.log('='.repeat(50));
    
    await Promise.all([
      this.scrapeFHPressroom(),
      this.scrapeHauteHorlogerie(), 
      this.scrapeBHI(),
      this.scrapeWatchesAndWonders()
    ]);
    
    console.log('\n🔄 Post-traitement des données...');
    this.deduplicateEvents();
    this.sortEventsByDate();
    
    console.log(`📊 Total: ${this.events.length} événements uniques`);
    
    await this.saveToJSON();
    
    console.log('\n🎉 Mise à jour terminée avec succès!');
    console.log('='.repeat(50));
  }
}

// Execution
if (require.main === module) {
  const scraper = new EventScraper();
  scraper.scrapeAllEvents().catch(error => {
    console.error('💥 Erreur fatale:', error);
    process.exit(1);
  });
}

export default EventScraper;
