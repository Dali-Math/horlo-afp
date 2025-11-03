// data/content.ts
import { Period, Region, Manufacture, Stat } from '../types';

export const stats: Stat[] = [
  { value: '500 Ans', label: "D'Excellence" },
  { value: '30 Millions', label: 'Montres/An' },
  { value: '50%', label: 'Marché Luxe' },
  { value: 'CHF 20Mds', label: 'Exportations' },
];

export const periods: Period[] = [
  {
    year: '1541',
    title: "L'Interdiction de Calvin",
    description:
      'Jean Calvin interdit le port de bijoux à Genève, poussant les orfèvres vers l\'horlogerie. Cette décision marque le début de la tradition horlogère genevoise.',
    image: '/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg',
  },
  {
    year: '1601',
    title: 'Naissance des Guildes',
    description:
      'Création de la Compagnie des Horlogers de Genève, première corporation horlogère au monde. Organisation stricte du métier et transmission du savoir-faire.',
    image: '/imgs/swiss_watchmaking_precision_tools_elegant_layout.jpg',
  },
  {
    year: '1750',
    title: 'Vallée de Joux',
    description:
      'Développement de l\'horlogerie dans les montagnes du Jura. Les paysans-horlogers créent les complications les plus sophistiquées pendant les longs hivers.',
    image: '/imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg',
  },
  {
    year: '1839',
    title: "L'Ère Patek Philippe",
    description:
      'Antoni Patek et Adrien Philippe fondent la manufacture la plus prestigieuse au monde. Innovation avec la couronne de remontoir sans clé.',
    image: '/imgs/Patek_Philippe_luxury_Swiss_watches_elegant_timepieces_craftsmanship.jpg',
  },
  {
    year: '1905',
    title: 'La Montre-Bracelet',
    description:
      'Hans Wilsdorf crée Rolex et popularise la montre-bracelet. Révolution de l\'industrie avec des montres étanches et précises pour le quotidien.',
    image: '/imgs/vintage_swiss_heritage_pocket_watch_gold_chain.jpg',
  },
  {
    year: '1983',
    title: 'La Renaissance',
    description:
      'Après la crise du quartz, retour triomphant de l\'horlogerie mécanique. Les manufactures suisses s\'imposent comme symboles ultimes du luxe et de l\'excellence.',
    image: '/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg',
  },
];

export const regions: Region[] = [
  {
    name: 'Genève',
    description:
      'Berceau historique de la haute horlogerie suisse depuis le 16ème siècle. Abrite les ateliers les plus prestigieux et le célèbre Poinçon de Genève.',
    image: '/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg',
    specialty: 'Haute horlogerie',
  },
  {
    name: 'Vallée de Joux',
    description:
      'Cœur des grandes complications. Les manufactures comme Audemars Piguet et Jaeger-LeCoultre y créent les mécanismes les plus sophistiqués.',
    image: '/imgs/Vallee_de_Joux_Audemars_Piguet_Museum_Swiss_Alps_Landscape.jpg',
    specialty: 'Complications',
  },
  {
    name: 'Le Locle',
    description:
      'Ville UNESCO abritant Tissot, Ulysse Nardin et Zenith. Architecture horlogère unique et tradition manufacturière séculaire.',
    image: '/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg',
    specialty: 'Innovation',
  },
  {
    name: 'Neuchâtel',
    description:
      'Centre académique et industriel de l\'horlogerie. Observatoire astronomique historique et nombreuses manufactures traditionnelles.',
    image: '/imgs/Neuchatel_Switzerland_historic_city_lake_architecture_watchmaking_clock_tower.jpg',
    specialty: 'Précision',
  },
  {
    name: 'Bienne',
    description:
      'Capitale moderne de l\'horlogerie avec Rolex, Omega et Swatch Group. Production industrielle de haute qualité et innovation technologique.',
    image: '/imgs/Bienne_Switzerland_Old_Town_Square_Watchmaking_City.jpg',
    specialty: 'Production',
  },
  {
    name: 'Schaffhausen',
    description:
      'Siège d\'IWC depuis 1868. Excellence germanique-suisse alliant ingénierie de précision et design intemporel.',
    image: '/imgs/Schaffhausen_Switzerland_Fronwagplatz_city_square.jpg',
    specialty: 'Ingénierie',
  },
];

export const manufactures: Manufacture[] = [
  {
    name: 'Patek Philippe',
    founded: '1839',
    specialty: 'Grandes Complications',
    description:
      'La manufacture la plus prestigieuse au monde. Référence absolue en matière de complications et de finition. Chaque montre est une œuvre d\'art horlogère.',
    image: '/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg',
    famous: 'Nautilus, Calatrava',
  },
  {
    name: 'Rolex',
    founded: '1905',
    specialty: 'Montres Sportives de Luxe',
    description:
      'Icône mondiale du succès et de la performance. Précision certifiée chronomètre, étanchéité légendaire et robustesse inégalée.',
    image: '/imgs/rolex_submariner_gold_luxury_swiss_watch_product_photo.jpg',
    famous: 'Submariner, Daytona',
  },
  {
    name: 'Audemars Piguet',
    founded: '1875',
    specialty: 'Haute Horlogerie Sportive',
    description:
      'Manufacture indépendante familiale spécialisée dans les grandes complications. Pionnière du luxe sportif avec la Royal Oak.',
    image: '/imgs/audemars_piguet_royal_oak_rose_gold_black_dial_luxury_swiss_watch.jpg',
    famous: 'Royal Oak',
  },
  {
    name: 'Vacheron Constantin',
    founded: '1755',
    specialty: 'Plus Ancienne Manufacture',
    description:
      'Production ininterrompue depuis 1755. Maître des complications et de l\'ultra-plat. Élégance classique et raffinement absolu.',
    image: '/imgs/Vacheron_Constantin_Tourbillon_Green_Dial_Luxury_Swiss_Watch.jpg',
    famous: 'Patrimony, Overseas',
  },
  {
    name: 'Omega',
    founded: '1848',
    specialty: 'Innovation & Précision',
    description:
      'Montre officielle de la NASA et des Jeux Olympiques. Précision légendaire et innovations techniques majeures.',
    image: '/imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg',
    famous: 'Speedmaster, Seamaster',
  },
  {
    name: 'Jaeger-LeCoultre',
    founded: '1833',
    specialty: 'Manufacture de Manufactures',
    description:
      'Plus de 1200 calibres créés et 400 brevets. Maître des complications et des montres réversibles. Excellence technique absolue.',
    image: '/imgs/jaeger_lecoultre_reverso_blue_dial_luxury_watch.jpg',
    famous: 'Reverso, Master',
  },
  {
    name: 'Blancpain',
    founded: '1735',
    specialty: 'Montres Mécaniques Pures',
    description:
      'Ne produit que des montres mécaniques. Maître de la haute horlogerie et des plongeuses professionnelles. Tradition et innovation.',
    image: '/imgs/blancpain_fifty_fathoms_luxury_swiss_dive_watch_product_shot.jpg',
    famous: 'Fifty Fathoms',
  },
  {
    name: 'IWC Schaffhausen',
    founded: '1868',
    specialty: 'Ingénierie de Précision',
    description:
      'Fusion de la précision suisse et de l\'ingénierie allemande. Spécialiste des montres d\'aviateur et des grandes complications.',
    image: '/imgs/IWC_Schaffhausen_Headquarters_Historic_Building_Switzerland.jpg',
    famous: 'Pilot, Portugieser',
  },
];
