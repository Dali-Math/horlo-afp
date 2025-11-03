import React, { useState } from 'react';
import { Search, Filter, Database, Package, AlertCircle, ExternalLink } from 'lucide-react';

interface PieceData {
  id: string;
  nom: string;
  categorie: string;
  reference: string;
  marque: string;
  compatibilite: string[];
  prixMin: number;
  prixMax: number;
  stock: string;
  specifications: Record<string, string>;
  image?: string;
  fournisseur: string;
  delai: string;
}

export default function BaseDonneesPieces() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('nom');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Base de données simulée
  const pieces: PieceData[] = [
    {
      id: '1',
      nom: 'Calibre ETA 2824-2',
      categorie: 'mouvement',
      reference: 'ETA 2824-2',
      marque: 'ETA',
      compatibilite: ['Tissot', 'Oris', 'Hamilton', 'Seiko'],
      prixMin: 180,
      prixMax: 250,
      stock: 'Disponible',
      specifications: {
        'Fréquence': '28,800 alt/h',
        'Réserve': '38 heures',
        'Rubis': '25',
        'Diamètre': '25.60mm',
        'Épaisseur': '4.60mm'
      },
      fournisseur: 'ETA SA',
      delai: '2-3 semaines'
    },
    {
      id: '2',
      nom: 'Spiral Nivaflex',
      categorie: 'mouvement',
      reference: 'NVX-NIVO',
      marque: 'Nivaflex',
      compatibilite: ['Universel'],
      prixMin: 15,
      prixMax: 35,
      stock: 'En stock',
      specifications: {
        'Matériau': 'Nivaflex',
        'Épaisseur': '0.08-0.20mm',
        'Largeur': '0.10-0.25mm',
        'Type': 'Spiral de précision'
      },
      fournisseur: 'Nivaflex SA',
      delai: '1 semaine'
    },
    {
      id: '3',
      nom: 'Fond de Boîte Boîtier Acier',
      categorie: 'boitier',
      reference: 'TUB-ACIER-42',
      marque: 'Boîtier Universe',
      compatibilite: ['Ø42mm'],
      prixMin: 85,
      prixMax: 120,
      stock: 'En stock',
      specifications: {
        'Matériau': 'Acier inoxydable 316L',
        'Résistance': '10 ATM',
        'Finition': 'Brossé',
        'Pâte d\'étanchéité': 'Incluse'
      },
      fournisseur: 'Case & Crystal SA',
      delai: '3-5 jours'
    },
    {
      id: '4',
      nom: 'Couronne Remontée',
      categorie: 'boitier',
      reference: 'CRO-REM-40',
      marque: 'Crown Pro',
      compatibilite: ['Ø40-44mm'],
      prixMin: 25,
      prixMax: 45,
      stock: 'En stock',
      specifications: {
        'Diamètre': '40mm',
        'Type': 'Remontée manuelle',
        'Étanchéité': '3 ATM',
        'Matériau': 'Acier 316L'
      },
      fournisseur: 'Crown Solutions',
      delai: '2-3 jours'
    },
    {
      id: '5',
      nom: 'Verre Saphir Bombé',
      categorie: 'boitier',
      reference: 'SAP-BOMB-42',
      marque: 'Crystal Clear',
      compatibilite: ['Ø42mm'],
      prixMin: 35,
      prixMax: 65,
      stock: 'Sur commande',
      specifications: {
        'Matériau': 'Saphir synthétique',
        'Traitement': 'Anti-reflets',
        'Épaisseur': '2.0mm',
        'Résistance': 'Anti-rayures'
      },
      fournisseur: 'Crystal Works',
      delai: '1-2 semaines'
    },
    {
      id: '6',
      nom: 'Roue Collet',
      categorie: 'mouvement',
      reference: 'RC-ETA-BAS',
      marque: 'ETA',
      compatibilite: ['ETA 2824', 'ETA 2836'],
      prixMin: 8,
      prixMax: 15,
      stock: 'En stock',
      specifications: {
        'Matériau': 'Laiton',
        'Diamètre': '0.80mm',
        'Hauteur': '1.20mm',
        'Pas': '0.20mm'
      },
      fournisseur: 'ETA SA',
      delai: '1 semaine'
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes catégories' },
    { id: 'mouvement', name: 'Mouvements' },
    { id: 'boitier', name: 'Boîtiers' },
    { id: 'complication', name: 'Complications' },
    { id: 'accessoire', name: 'Accessoires' }
  ];

  const marques = [
    { id: 'all', name: 'Toutes marques' },
    { id: 'eta', name: 'ETA' },
    { id: 'nivaflex', name: 'Nivaflex' },
    { id: 'boitier', name: 'Boîtier Universe' },
    { id: 'crown', name: 'Crown Pro' },
    { id: 'crystal', name: 'Crystal Clear' }
  ];

  // Filtrage et tri
  const filteredPieces = pieces.filter(piece => {
    const matchesSearch = piece.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         piece.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || piece.categorie === selectedCategory;
    const matchesBrand = selectedBrand === 'all' || piece.marque.toLowerCase().includes(selectedBrand.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedPieces = [...filteredPieces].sort((a, b) => {
    switch (sortBy) {
      case 'nom': return a.nom.localeCompare(b.nom);
      case 'prix': return a.prixMin - b.prixMin;
      case 'marque': return a.marque.localeCompare(b.marque);
      default: return 0;
    }
  });

  const paginatedPieces = sortedPieces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedPieces.length / itemsPerPage);

  const getStockColor = (stock: string) => {
    switch (stock.toLowerCase()) {
      case 'en stock': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'disponible': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'sur commande': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/20 p-3 rounded-lg">
          <Database className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-light-100">Base de Données des Pièces</h2>
          <p className="text-slate-600 dark:text-light-400">Catalogue complet des composants horlogers</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar de filtres */}
        <div className="lg:col-span-1 space-y-4">
          {/* Recherche */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Recherche
            </h3>
            <input
              type="text"
              placeholder="Nom ou référence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Filtres */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtres
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Marque
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  {marques.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-light-300 mb-2">
                  Trier par
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-light-100 text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="nom">Nom</option>
                  <option value="prix">Prix (CHF)</option>
                  <option value="marque">Marque</option>
                </select>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
            <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-3">📊 Statistiques</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-700 dark:text-emerald-300">Total pièces:</span>
                <span className="font-medium text-emerald-800 dark:text-emerald-200">{sortedPieces.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700 dark:text-emerald-300">En stock:</span>
                <span className="font-medium text-emerald-800 dark:text-emerald-200">
                  {pieces.filter(p => p.stock === 'En stock' || p.stock === 'Disponible').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700 dark:text-emerald-300">Catégories:</span>
                <span className="font-medium text-emerald-800 dark:text-emerald-200">{categories.length - 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des pièces */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-light-100">
                  Pièces Trouvées ({sortedPieces.length})
                </h3>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Page {currentPage} sur {totalPages}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
              {paginatedPieces.map((piece) => (
                <div key={piece.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-light-100 text-sm leading-tight">
                        {piece.nom}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {piece.reference}
                      </p>
                    </div>
                    <Package className="w-5 h-5 text-slate-400 flex-shrink-0 ml-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-light-400">Marque:</span>
                      <span className="font-medium text-slate-900 dark:text-light-100">{piece.marque}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-light-400">Prix:</span>
                      <span className="font-medium text-slate-900 dark:text-light-100">
                        {piece.prixMin} - {piece.prixMax} CHF
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-light-400">Stock:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(piece.stock)}`}>
                        {piece.stock}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-600 dark:text-light-400">
                      <strong>Spécifications:</strong>
                    </div>
                    <div className="space-y-1">
                      {Object.entries(piece.specifications).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-slate-500 dark:text-slate-400">{key}:</span>
                          <span className="text-slate-700 dark:text-light-300">{value}</span>
                        </div>
                      ))}
                      {Object.entries(piece.specifications).length > 2 && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          +{Object.entries(piece.specifications).length - 2} autres...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-600">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">{piece.fournisseur}</span>
                      <span className="text-slate-500 dark:text-slate-400">{piece.delai}</span>
                    </div>
                  </div>

                  <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2">
                    <ExternalLink className="w-3 h-3" />
                    Voir Détails
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-light-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                  >
                    Précédent
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 text-sm rounded transition-colors ${
                            currentPage === pageNum
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-light-300 hover:bg-slate-300 dark:hover:bg-slate-500'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-light-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}