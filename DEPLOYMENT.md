# Guide de déploiement et personnalisation

## 🚀 Déploiement sur Vercel

1. **Push sur GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Importer le projet GitHub
   - Vercel détectera automatiquement Next.js

3. **Configuration automatique**
   - Build Command: `yarn build`
   - Output Directory: `.next`
   - Install Command: `yarn install`

## 📁 Ajout du contenu réel

### 1. Photos
Ajoutez dans `/public/images/` :
- `profile.jpg` - Photo du Dr. Abd El Kader Gaha
- `og-image.jpg` - Image pour réseaux sociaux

### 2. Livres PDF
Ajoutez dans `/public/pdfs/` :
- `livre-1.pdf`
- `livre-2.pdf` 
- `livre-3.pdf`

### 3. Audios Khoutab
Ajoutez dans `/public/audios/` :
- `khutba-1.mp3`
- `khutba-2.mp3`
- etc.

### 4. Vidéos YouTube
Modifiez `/src/app/[locale]/dourous/page.tsx` :
```typescript
const videos: VideoData[] = [
  {
    id: 'VOTRE_ID_YOUTUBE_1',
    title: 'Titre du cours 1',
    description: 'Description...'
  },
  // ...
];
```

## 🎨 Personnalisation

### Couleurs
Modifiez les couleurs dans les fichiers TypeScript :
- Bleu principal: `bg-blue-600` → `bg-[votre-couleur]`
- Autres couleurs via les classes Tailwind

### Contenu
Modifiez les traductions dans :
- `/locales/fr.json`
- `/locales/ar.json`

### Navigation
Ajoutez des pages dans `/src/app/[locale]/nouvelle-page/`

## 🔧 Maintenance

### Ajouter une nouvelle page
1. Créer le dossier `/src/app/[locale]/nouvelle-page/`
2. Ajouter `page.tsx` dans ce dossier
3. Mettre à jour la navigation dans `Navbar.tsx`
4. Ajouter les traductions dans les fichiers JSON

### Modifier les styles
- Utilisez les classes Tailwind
- Mode sombre automatique avec `dark:`
- Responsive avec `md:`, `lg:`, etc.

## 📞 Support technique

Pour toute assistance technique ou modification, contactez le développeur.