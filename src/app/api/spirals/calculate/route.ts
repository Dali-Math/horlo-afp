import { NextRequest, NextResponse } from 'next/server';
import { 
  calculateSpiral, 
  findClosestMovement,
  SpiralParams,
  CalculatedResults,
  MovementMatch
} from '@/lib/spiral-calculator';

// Gestion des CORS pour permettre l'accès depuis d'autres logiciels
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

// POST /api/spirals/calculate
export async function POST(request: NextRequest) {
  try {
    // 1. Validation du Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { 
          error: 'Content-Type must be application/json',
          code: 'INVALID_CONTENT_TYPE'
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // 2. Parsing du body
    const body = await request.json();
    
    // 3. Extraction et validation des paramètres
    const {
      diametre,
      frequence,
      amplitude,
      materiau,
      typeSpiral,
      metadata
    } = body as {
      diametre?: number;
      frequence?: number;
      amplitude?: number;
      materiau?: string;
      typeSpiral?: string;
      metadata?: {
        clientId?: string;
        requestId?: string;
        notes?: string;
      };
    };

    // 4. Validation stricte
    const errors: string[] = [];
    
    if (!diametre || typeof diametre !== 'number' || diametre <= 0 || diametre > 50) {
      errors.push('diametre is required, must be a positive number (max 50mm)');
    }
    
    if (!frequence || typeof frequence !== 'number' || ![18000, 21600, 25200, 28800, 36000].includes(frequence)) {
      errors.push('frequence is required, must be one of: 18000, 21600, 25200, 28800, 36000');
    }
    
    if (!amplitude || typeof amplitude !== 'number' || amplitude < 180 || amplitude > 330) {
      errors.push('amplitude is required, must be between 180° and 330°');
    }
    
    if (!materiau || !['nivarox', 'silicium', 'acier'].includes(materiau)) {
      errors.push('materiau is required, must be one of: nivarox, silicium, acier');
    }
    
    if (!typeSpiral || !['phillips', 'breguet', 'grossmann'].includes(typeSpiral)) {
      errors.push('typeSpiral is required, must be one of: phillips, breguet, grossmann');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: errors
        },
        {
          status: 422,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // 5. Construction des paramètres
    const params: SpiralParams = {
      diametre,
      frequence,
      amplitude,
      materiau: materiau as 'nivarox' | 'silicium' | 'acier',
      typeSpiral: typeSpiral as 'phillips' | 'breguet' | 'grossmann'
    };

    // 6. Exécution du calcul
    const startTime = Date.now();
    const results: CalculatedResults = calculateSpiral(params);
    const match: MovementMatch = findClosestMovement(params);
    
    // 7. Log pour analytics (optionnel)
    console.log('API Spiral Calculation:', {
      timestamp: new Date().toISOString(),
      params,
      results,
      executionTime: `${Date.now() - startTime}ms`,
      metadata
    });

    // 8. Réponse JSON
    return NextResponse.json(
      {
        success: true,
        data: {
          ...results,
          validation: {
            validated: results.validated,
            sourceMovement: results.sourceMovement,
            confidence: match.confidence,
            closestMatch: match.closestMovement
          },
          metadata: {
            version: '1.0.0',
            calculatedAt: new Date().toISOString(),
            executionTimeMs: Date.now() - startTime
          }
        }
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}

// Empêcher les autres méthodes
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed. Use POST.',
      code: 'METHOD_NOT_ALLOWED'
    },
    {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  );
}
