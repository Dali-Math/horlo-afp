


export const CALIBRE_DB = [
  // ============================================================
  // ETA / VALJOUX (Swatch Group) - Les standards de l'industrie
  // ============================================================
  { id: 'eta2824', name: 'ETA 2824-2', liftAngle: 50, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'eta2836', name: 'ETA 2836-2', liftAngle: 50, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'eta2892a2', name: 'ETA 2892-A2', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'eta2893', name: 'ETA 2893-2 (GMT)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'eta2894', name: 'ETA 2894-2 (Chrono)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'eta2895', name: 'ETA 2895-2 (Sub-sec)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'eta2897', name: 'ETA 2897 (PR)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  
  // Chronographes Valjoux
  { id: 'valjoux7750', name: 'Valjoux 7750', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'valjoux7751', name: 'Valjoux 7751', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'valjoux7753', name: 'Valjoux 7753', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'valjoux7754', name: 'Valjoux 7754 (GMT)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  
  // ETA grandes complications
  { id: 'eta7750g', name: 'ETA 7750 Grande Large', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'eta6497', name: 'ETA Unitas 6497', liftAngle: 52, beatRate: 18000, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'eta6498', name: 'ETA Unitas 6498', liftAngle: 52, beatRate: 18000, minAmplitude: 250, maxBeatError: 0.4 },
  
  // ETA pour dames
  { id: 'eta2671', name: 'ETA 2671', liftAngle: 50, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.3 },
  { id: 'eta2678', name: 'ETA 2678', liftAngle: 50, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.3 },

  // ============================================================
  // SELLITA - Alternatives suisses à ETA
  // ============================================================
  { id: 'sw200', name: 'Sellita SW200-1', liftAngle: 50, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'sw220', name: 'Sellita SW220-1', liftAngle: 50, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'sw240', name: 'Sellita SW240-1', liftAngle: 50, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'sw260', name: 'Sellita SW260-1', liftAngle: 50, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'sw300', name: 'Sellita SW300-1', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'sw330', name: 'Sellita SW330-1 (GMT)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'sw360', name: 'Sellita SW360-1', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'sw500', name: 'Sellita SW500', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  
  // Chronographes Sellita
  { id: 'sw511', name: 'Sellita SW511', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'sw520', name: 'Sellita SW520', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },

  // ============================================================
  // MIYOTA (Citizen) - Mouvements japonais
  // ============================================================
  { id: 'miyota9015', name: 'Miyota 9015', liftAngle: 52, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'miyota9039', name: 'Miyota 9039 (No date)', liftAngle: 52, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'miyota8215', name: 'Miyota 8215', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'miyota821a', name: 'Miyota 821A', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'miyota8205', name: 'Miyota 8205 (Day-Date)', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'miyota8315', name: 'Miyota 8315', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'miyota90s5', name: 'Miyota 90S5', liftAngle: 52, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.4 },
  
  // Chronographes Miyota
  { id: 'miyota6s21', name: 'Miyota 6S21 (Chrono)', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'miyota6t33', name: 'Miyota 6T33', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  
  // Complications
  { id: 'miyota9100', name: 'Miyota 9100 (PR)', liftAngle: 52, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.4 },

  // ============================================================
  // SEIKO - Manufacture japonaise
  // ============================================================
  // Grand Seiko
  { id: 'seiko9s55', name: 'Grand Seiko 9S55', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'seiko9s65', name: 'Grand Seiko 9S65', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'seiko9s85', name: 'Grand Seiko 9S85 Hi-Beat', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'seiko9s86', name: 'Grand Seiko 9S86 GMT Hi-Beat', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Seiko standard
  { id: 'seiko6r15', name: 'Seiko 6R15', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'seiko6r20', name: 'Seiko 6R20', liftAngle: 52, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'seiko6r21', name: 'Seiko 6R21', liftAngle: 52, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'seiko6r24', name: 'Seiko 6R24', liftAngle: 52, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'seiko6r27', name: 'Seiko 6R27', liftAngle: 52, beatRate: 28800, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'seiko6r35', name: 'Seiko 6R35', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  
  // Seiko Instruments
  { id: 'seiko4r35', name: 'Seiko 4R35', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'seiko4r36', name: 'Seiko 4R36', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'seiko4r39', name: 'Seiko 4R39', liftAngle: 52, beatRate: 21600, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'seiko7s26', name: 'Seiko 7S26', liftAngle: 52, beatRate: 21600, minAmplitude: 230, maxBeatError: 0.6 },
  { id: 'seiko7s36', name: 'Seiko 7S36', liftAngle: 52, beatRate: 21600, minAmplitude: 230, maxBeatError: 0.6 },
  
  // Chronographes Seiko
  { id: 'seiko8r28', name: 'Seiko 8R28 (Chrono)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'seiko6s37', name: 'Seiko 6S37 (Chrono)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  
  // Spring Drive (specs différentes - à adapter)
  { id: 'seiko9r65', name: 'Spring Drive 9R65', liftAngle: 52, beatRate: 25200, minAmplitude: 999, maxBeatError: 0.1 },

  // ============================================================
  // ROLEX - Manufacture suisse
  // ============================================================
  { id: 'rolex3135', name: 'Rolex Calibre 3135', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3130', name: 'Rolex Calibre 3130', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3131', name: 'Rolex Calibre 3131', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3132', name: 'Rolex Calibre 3132', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3136', name: 'Rolex Calibre 3136', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3155', name: 'Rolex Calibre 3155', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3156', name: 'Rolex Calibre 3156', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3185', name: 'Rolex Calibre 3185 (GMT)', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3186', name: 'Rolex Calibre 3186 (GMT)', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'rolex3187', name: 'Rolex Calibre 3187 (GMT)', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Nouvelle génération
  { id: 'rolex3235', name: 'Rolex Calibre 3235', liftAngle: 52, beatRate: 28800, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'rolex3230', name: 'Rolex Calibre 3230', liftAngle: 52, beatRate: 28800, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'rolex3285', name: 'Rolex Calibre 3285 (GMT)', liftAngle: 52, beatRate: 28800, minAmplitude: 275, maxBeatError: 0.2 },
  
  // Chronographes
  { id: 'rolex4130', name: 'Rolex Calibre 4130 (Daytona)', liftAngle: 52, beatRate: 28800, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'rolex4161', name: 'Rolex Calibre 4161 (Yacht-Master)', liftAngle: 52, beatRate: 28800, minAmplitude: 275, maxBeatError: 0.2 },

  // ============================================================
  // OMEGA - Swatch Group
  // ============================================================
  // Co-Axial Master Chronometer
  { id: 'omega8800', name: 'Omega Co-Axial 8800', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega8801', name: 'Omega Co-Axial 8801', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega8806', name: 'Omega Co-Axial 8806', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega8807', name: 'Omega Co-Axial 8807', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega8810', name: 'Omega Co-Axial 8810', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega8812', name: 'Omega Co-Axial 8812', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  
  { id: 'omega8900', name: 'Omega Co-Axial 8900', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega8901', name: 'Omega Co-Axial 8901', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega8906', name: 'Omega Co-Axial 8906', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  
  { id: 'omega8922', name: 'Omega Co-Axial 8922', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega8938', name: 'Omega Co-Axial 8938', liftAngle: 48, beatRate: 25200, minAmplitude: 260, maxBeatError: 0.3 },
  
  // Chronographes
  { id: 'omega9900', name: 'Omega Co-Axial 9900', liftAngle: 48, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega9901', name: 'Omega Co-Axial 9901', liftAngle: 48, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'omega9920', name: 'Omega Co-Axial 9920', liftAngle: 48, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  
  // Historiques
  { id: 'omega1861', name: 'Omega 1861 (Speedmaster)', liftAngle: 42, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'omega1863', name: 'Omega 1863 (Speedmaster)', liftAngle: 42, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'omega2500', name: 'Omega Co-Axial 2500', liftAngle: 38, beatRate: 25200, minAmplitude: 250, maxBeatError: 0.3 },

  // ============================================================
  // PATEK PHILIPPE - Haute horlogerie
  // ============================================================
  { id: 'pp240', name: 'Patek Philippe 240', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'pp240ps', name: 'Patek Philippe 240 PS', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'pp240lu', name: 'Patek Philippe 240 LU', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'pp240hu', name: 'Patek Philippe 240 HU', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  
  { id: 'pp324', name: 'Patek Philippe 324', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'pp324sc', name: 'Patek Philippe 324 SC', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'pp324s', name: 'Patek Philippe 324 S', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'pp324sq', name: 'Patek Philippe 324 SQ', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  
  { id: 'pp330', name: 'Patek Philippe 330', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'pp330sc', name: 'Patek Philippe 330 SC', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  
  { id: 'pp215', name: 'Patek Philippe 215', liftAngle: 52, beatRate: 28800, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'pp215ps', name: 'Patek Philippe 215 PS', liftAngle: 52, beatRate: 28800, minAmplitude: 275, maxBeatError: 0.2 },
  
  // Complications
  { id: 'ppchr29535', name: 'Patek Philippe CHR 29-535', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'ppchr29720', name: 'Patek Philippe CHR 29-720', liftAngle: 52, beatRate: 28800, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'pprs27', name: 'Patek Philippe R 27', liftAngle: 52, beatRate: 21600, minAmplitude: 275, maxBeatError: 0.2 },
  
  // Vintage
  { id: 'pp27510', name: 'Patek Philippe 27-10', liftAngle: 52, beatRate: 18000, minAmplitude: 250, maxBeatError: 0.3 },

  // ============================================================
  // AUDEMARS PIGUET - Haute horlogerie
  // ============================================================
  { id: 'ap3120', name: 'Audemars Piguet 3120', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'ap3121', name: 'Audemars Piguet 3121', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'ap3122', name: 'Audemars Piguet 3122', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'ap3123', name: 'Audemars Piguet 3123', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'ap3124', name: 'Audemars Piguet 3124', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'ap3126', name: 'Audemars Piguet 3126', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Chronographes
  { id: 'ap2385', name: 'Audemars Piguet 2385', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'ap2936', name: 'Audemars Piguet 2936', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Concept
  { id: 'ap2894', name: 'Audemars Piguet 2894', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'ap2897', name: 'Audemars Piguet 2897', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'ap2910', name: 'Audemars Piguet 2910', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Vintage
  { id: 'ap2003', name: 'Audemars Piguet 2003', liftAngle: 52, beatRate: 18000, minAmplitude: 250, maxBeatError: 0.3 },

  // ============================================================
  // VACHERON CONSTANTIN - Haute horlogerie
  // ============================================================
  { id: 'vc2450', name: 'Vacheron Constantin 2450', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'vc2455', name: 'Vacheron Constantin 2455', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'vc2460', name: 'Vacheron Constantin 2460', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'vc2460r31l', name: 'VC 2460 R31L', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'vc2460r31r7', name: 'VC 2460 R31R7', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Complications
  { id: 'vc1120', name: 'Vacheron Constantin 1120', liftAngle: 52, beatRate: 19800, minAmplitude: 260, maxBeatError: 0.2 },
  { id: 'vc1120at', name: 'Vacheron Constantin 1120 AT', liftAngle: 52, beatRate: 19800, minAmplitude: 260, maxBeatError: 0.2 },
  { id: 'vc1141', name: 'Vacheron Constantin 1141', liftAngle: 52, beatRate: 18000, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'vc1142', name: 'Vacheron Constantin 1142', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Patrimoine
  { id: 'vc1400', name: 'Vacheron Constantin 1400', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'vc4400', name: 'Vacheron Constantin 4400', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },

  // ============================================================
  // JAEGER-LECOULTRE - Manufacture complète
  // ============================================================
  { id: 'jlc889', name: 'Jaeger-LeCoultre 889', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'jlc899', name: 'Jaeger-LeCoultre 899', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'jlc896', name: 'Jaeger-LeCoultre 896', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'jlc898', name: 'Jaeger-LeCoultre 898', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'jlc899a', name: 'Jaeger-LeCoultre 899A', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Reverso
  { id: 'jlc822', name: 'Jaeger-LeCoultre 822', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'jlc824', name: 'Jaeger-LeCoultre 824', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'jlc843', name: 'Jaeger-LeCoultre 843', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Master Control
  { id: 'jlc920', name: 'Jaeger-LeCoultre 920', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'jlc925', name: 'Jaeger-LeCoultre 925', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Grande Complication
  { id: 'jlcaliber101', name: 'JLC Caliber 101', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },

  // ============================================================
  // ZENITH - Manufacture LVMH
  // ============================================================
  { id: 'zenith400', name: 'Zenith El Primero 400', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.3 },
  { id: 'zenith400b', name: 'Zenith El Primero 400B', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.3 },
  { id: 'zenith4061', name: 'Zenith El Primero 4061', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.3 },
  { id: 'zenith4069', name: 'Zenith El Primero 4069', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.3 },
  { id: 'zenith4650b', name: 'Zenith El Primero 4650B', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.3 },
  
  // Nouveaux chronographes
  { id: 'zenith9004', name: 'Zenith El Primero 9004', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.3 },
  { id: 'zenith3600', name: 'Zenith El Primero 3600', liftAngle: 52, beatRate: 36000, minAmplitude: 270, maxBeatError: 0.3 },
  
  // Elite
  { id: 'zenithelite670', name: 'Zenith Elite 670', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'zenithelite681', name: 'Zenith Elite 681', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'zenithelite6150', name: 'Zenith Elite 6150', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },

  // ============================================================
  // F.P. JOURNE - Horloger indépendant
  // ============================================================
  { id: 'fpj1304', name: 'F.P. Journe Caliber 1304', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'fpj1305', name: 'F.P. Journe Caliber 1305', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'fpj1498', name: 'F.P. Journe Caliber 1498', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'fpj1502', name: 'F.P. Journe Caliber 1502', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'fpj1510', name: 'F.P. Journe Caliber 1510', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  
  // Chronographes
  { id: 'fpj1517', name: 'F.P. Journe Caliber 1517', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'fpj1519', name: 'F.P. Journe Caliber 1519', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },
  { id: 'fpj1520', name: 'F.P. Journe Caliber 1520', liftAngle: 52, beatRate: 21600, minAmplitude: 280, maxBeatError: 0.2 },

  // ============================================================
  // A. LANGE & SÖHNE - Haute horlogerie allemande
  // ============================================================
  { id: 'langeglashutte1', name: 'A. Lange & Söhne Glashütte 1', liftAngle: 52, beatRate: 21600, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'lange1815', name: 'A. Lange & Söhne 1815', liftAngle: 52, beatRate: 21600, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'lange1815chrono', name: 'A. Lange & Söhne 1815 Chronograph', liftAngle: 52, beatRate: 21600, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'langel951', name: 'A. Lange & Söhne L951.6', liftAngle: 52, beatRate: 18000, minAmplitude: 260, maxBeatError: 0.2 },
  { id: 'langel952', name: 'A. Lange & Söhne L952.1', liftAngle: 52, beatRate: 18000, minAmplitude: 260, maxBeatError: 0.2 },
  { id: 'langelange1', name: 'A. Lange & Söhne Lange 1 L121.1', liftAngle: 52, beatRate: 21600, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'langesaxonia', name: 'A. Lange & Söhne Saxonia L941.1', liftAngle: 52, beatRate: 21600, minAmplitude: 275, maxBeatError: 0.2 },
  { id: 'langezw1', name: 'A. Lange & Söhne Zeitwerk L043.1', liftAngle: 52, beatRate: 18000, minAmplitude: 260, maxBeatError: 0.2 },

  // ============================================================
  // NOMOS - Manufacture allemande moderne
  // ============================================================
  { id: 'nomosalpha', name: 'Nomos Alpha', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'nomosbeta', name: 'Nomos Beta', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'nomosgamma', name: 'Nomos Gamma', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'nomosdelta', name: 'Nomos Delta', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'nomosepsilon', name: 'Nomos Epsilon', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'nomoszeta', name: 'Nomos Zeta', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'nomosxi', name: 'Nomos Xi', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'nomoslambda', name: 'Nomos Lambda', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.3 },
  { id: 'nomosduw3001', name: 'Nomos DUW 3001', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'nomosduw6101', name: 'Nomos DUW 6101', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },

  // ============================================================
  // BREGUET - LVMH
  // ============================================================
  { id: 'breguet777', name: 'Breguet Caliber 777', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'breguet777q', name: 'Breguet Caliber 777Q', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'breguet591', name: 'Breguet Caliber 591', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'breguet502', name: 'Breguet Caliber 502', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'breguet505', name: 'Breguet Caliber 505', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'breguet574', name: 'Breguet Caliber 574DR', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },

  // ============================================================
  // BLANCPAIN - Swatch Group
  // ============================================================
  { id: 'blancpain1150', name: 'Blancpain Caliber 1150', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'blancpain1151', name: 'Blancpain Caliber 1151', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'blancpain1315', name: 'Blancpain Caliber 1315', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'blancpain1335', name: 'Blancpain Caliber 1335', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'blancpain1318', name: 'Blancpain 1318 (PR)', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },

  // ============================================================
  // BREITLING - Mouvements professionnels
  // ============================================================
  { id: 'breitling01', name: 'Breitling Manufacture 01', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'breitling02', name: 'Breitling Manufacture 02', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'breitling04', name: 'Breitling Manufacture 04 (GMT)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'breitling05', name: 'Breitling Manufacture 05', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'breitling13', name: 'Breitling Caliber 13', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },

  // ============================================================
  // TAG HEUER - LVMH
  // ============================================================
  { id: 'tagheuer01', name: 'TAG Heuer Caliber 01', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'tagheuer02t', name: 'TAG Heuer 02T Tourbillon', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'tagheuerheuer02', name: 'TAG Heuer Heuer 02', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'tagheuerheuer11', name: 'TAG Heuer Heuer 11', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'tagheuer1887', name: 'TAG Heuer Caliber 1887', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },

  // ============================================================
  // IWC - Richemont
  // ============================================================
  { id: 'iwc30110', name: 'IWC 30110 (ETA 2892)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'iwc30120', name: 'IWC 30120', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'iwc30750', name: 'IWC 30750', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'iwc79320', name: 'IWC 79320 (7750)', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'iwc79350', name: 'IWC 79350', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'iwc79230', name: 'IWC 79230', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  
  // Manufacture
  { id: 'iwc52010', name: 'IWC 52010', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'iwc52011', name: 'IWC 52011', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'iwc52014', name: 'IWC 52014', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'iwc82200', name: 'IWC 82200', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'iwc82210', name: 'IWC 82210', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'iwc82650', name: 'IWC 82650', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'iwc82985', name: 'IWC 82985', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },

  // ============================================================
  // PANERAI - Richemont
  // ============================================================
  { id: 'paneraip3000', name: 'Panerai P.3000', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip3001', name: 'Panerai P.3001', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip3002', name: 'Panerai P.3002', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip4000', name: 'Panerai P.4000', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip5000', name: 'Panerai P.5000', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip9000', name: 'Panerai P.9000', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip9001', name: 'Panerai P.9001', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip9002', name: 'Panerai P.9002', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip9010', name: 'Panerai P.9010', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'paneraip999', name: 'Panerai P.999', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },

  // ============================================================
  // CARTIER - Richemont
  // ============================================================
  { id: 'cartier1847', name: 'Cartier 1847 MC', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'cartier1904', name: 'Cartier 1904 MC', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },
  { id: 'cartier430mc', name: 'Cartier 430 MC', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'cartier8971', name: 'Cartier 8971 MC', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.4 },
  { id: 'cartier9452', name: 'Cartier 9452 MC (Tourbillon)', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'cartier9619', name: 'Cartier 9619 MC', liftAngle: 52, beatRate: 21600, minAmplitude: 260, maxBeatError: 0.3 },

  // ============================================================
  // GIRARD-PERREGAUX - Manufacture indépendante
  // ============================================================
  { id: 'gp3300', name: 'Girard-Perregaux 3300', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'gp3300195', name: 'GP 3300-1955', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'gp3300210', name: 'GP 3300-2100', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'gp3300219', name: 'GP 3300-2190', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'gp3300229', name: 'GP 3300-2290', liftAngle: 52, beatRate: 28800, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Constant Force
  { id: 'gp09400', name: 'Girard-Perregaux 09400-0001', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  { id: 'gp09500', name: 'Girard-Perregaux 09500-0001', liftAngle: 52, beatRate: 21600, minAmplitude: 270, maxBeatError: 0.2 },
  
  // Vintage
  { id: 'gp3100', name: 'Girard-Perregaux 3100', liftAngle: 52, beatRate: 28800, minAmplitude: 260, maxBeatError: 0.3 },

  // ============================================================
  // MONTRES CHINOISES (pour tests et comparaison)
  // ============================================================
  { id: 'seagullst6', name: 'Sea-Gull ST6', liftAngle: 52, beatRate: 21600, minAmplitude: 220, maxBeatError: 0.8 },
  { id: 'seagullst16', name: 'Sea-Gull ST16', liftAngle: 52, beatRate: 21600, minAmplitude: 230, maxBeatError: 0.6 },
  { id: 'seagullst17', name: 'Sea-Gull ST17', liftAngle: 52, beatRate: 21600, minAmplitude: 230, maxBeatError: 0.6 },
  { id: 'seagullst18', name: 'Sea-Gull ST18', liftAngle: 52, beatRate: 21600, minAmplitude: 230, maxBeatError: 0.6 },
  { id: 'seagullst19', name: 'Sea-Gull ST19 (Chrono)', liftAngle: 52, beatRate: 18000, minAmplitude: 220, maxBeatError: 0.8 },
  { id: 'seagullst21', name: 'Sea-Gull ST21', liftAngle: 52, beatRate: 28800, minAmplitude: 240, maxBeatError: 0.5 },
  { id: 'seagullst36', name: 'Sea-Gull ST36', liftAngle: 52, beatRate: 18000, minAmplitude: 220, maxBeatError: 0.8 },
  { id: 'seagullst80', name: 'Sea-Gull ST80 (Tourbillon)', liftAngle: 52, beatRate: 21600, minAmplitude: 250, maxBeatError: 0.5 },
  
  // Shanghai
  { id: 'shanghaizz2a', name: 'Shanghai 2A', liftAngle: 52, beatRate: 18000, minAmplitude: 220, maxBeatError: 0.8 },
  { id: 'shanghaizzf2', name: 'Shanghai Z2F2', liftAngle: 52, beatRate: 18000, minAmplitude: 220, maxBeatError: 0.8 },
];
