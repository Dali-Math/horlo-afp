'use client';

import Link from 'next/link';
import { useState } from 'react';

type ViewMode = 'bad' | 'good';

type CaseItem = {
  id: string;
  category: string;
  title: string;
  image: string;
  symptom: string;
  cause: string;
  error: string;
  good: string;
  tool: string;
};

const CASES: CaseItem[] = [
  {
    id: 'c1',
    category: 'Barillet & énergie',
    title: 'Le ressort de barillet qui saute',
    image: '/images