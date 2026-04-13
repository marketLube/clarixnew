/**
 * Curated Unsplash photo ids that return HTTP 200 from images.unsplash.com
 * (many historical ids are removed by Unsplash → 404 → broken Next/Image).
 */
export const VERIFIED_UNSPLASH_IDS = [
  "photo-1602216056096-3b40cc0c9944",
  "photo-1449824913935-59a10b8d2000",
  "photo-1509316785289-025f5b846b35",
  "photo-1507525428034-b723cf961d3e",
  "photo-1441974231531-c6227db76b6e",
  "photo-1470071459604-3b5ec3a7fe05",
  "photo-1469474968028-56623f02e42e",
  "photo-1554995207-c18c203602cb",
  "photo-1506905925346-21bda4d32df4",
  "photo-1518837695005-2083093ee35b",
  "photo-1483728642387-6c3bdd6c93e5",
  "photo-1472214103451-9374bd1c798e",
  "photo-1434030216411-0b793f4b4173",
  "photo-1541339907198-e08756dedf3f",
  "photo-1523240795612-9a054b0db644",
  "photo-1517694712202-14dd9538aa97",
  "photo-1560179707-f14e90ef3623",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1497366216548-37526070297c",
  "photo-1497366754035-f200968a6e72",
  "photo-1552664730-d307ca884978",
  "photo-1542744173-8e7e53415bb0",
  "photo-1504384308090-c894fdcc538d",
  "photo-1519389950473-47ba0277781c",
  "photo-1549880338-65ddcdfd017b",
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1464822759023-fed622ff2c3b",
  "photo-1571260899304-425eee4c7efc",
  "photo-1562774053-701939374585",
  "photo-1577495508048-b635879837f1",
  "photo-1524178232363-1fb2b075b655",
  "photo-1555949963-aa79dcee981c",
  "photo-1450101499163-c8848c66ca85",
  "photo-1522202176988-66273c2fd55f",
  "photo-1522071820081-009f0129c71c",
  "photo-1564981797816-1043664bf78d",
  "photo-1522771739844-6a9f6d5f14af",
  "photo-1531482615713-2afd69097998",
  "photo-1511578314322-379afb476865",
  "photo-1517245386807-bb43f82c33c4",
  "photo-1600880292203-757bb62b4baf",
  "photo-1438761681033-6461ffad8d80",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1544005313-94ddf0286df2",
  "photo-1500648767791-00dcc994a43e",
  "photo-1534528741775-53994a69daeb",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1517841905240-472988babdf9",
  "photo-1454165804606-c3d57bc86b40",
  "photo-1576091160399-112ba8d25d1d",
  "photo-1554224155-6726b3ff858f",
  "photo-1532094349884-543bc11b234d",
  "photo-1561070791-2526d30994b5",
  "photo-1500382017468-9049fed747ef",
] as const;

export const unsplashUrl = (photoPath: string, w = 1200) =>
  `https://images.unsplash.com/${photoPath}?ixlib=rb-4.1.0&auto=format&fit=crop&fm=jpg&w=${w}&q=85`;

function stableIndex(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Map any legacy seed key to a working Unsplash asset (stable per key). */
export function pickPhoto(key: string): string {
  return VERIFIED_UNSPLASH_IDS[stableIndex(key) % VERIFIED_UNSPLASH_IDS.length]!;
}
