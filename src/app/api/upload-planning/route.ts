import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('planning') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Vérifier que c'est bien un PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Le fichier doit être un PDF' }, { status: 400 });
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Chemin vers le dossier public
    const publicDir = path.join(process.cwd(), 'public');
    
    // Créer le dossier s'il n'existe pas
    try {
      await mkdir(publicDir, { recursive: true });
    } catch (error) {
      // Le dossier existe déjà
    }

    // Sauvegarder le fichier
    const filePath = path.join(publicDir, 'planning-horlogerie.pdf');
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      message: 'Planning mis à jour avec succès',
      url: '/planning-horlogerie.pdf'
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload' 
    }, { status: 500 });
  }
}
