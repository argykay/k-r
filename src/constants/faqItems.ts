import type { TranslationKey } from '@i18n/types';

export type FaqContentBlock =
  | { type: 'paragraph'; key: TranslationKey }
  | { type: 'list'; keys: TranslationKey[] };

export type FaqItemConfig = {
  id: string;
  questionKey: TranslationKey;
  blocks: FaqContentBlock[];
};

export const FAQ_ITEMS: FaqItemConfig[] = [
  {
    id: 'whatToWear',
    questionKey: 'faq.whatToWearQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.whatToWearP1' },
      { type: 'paragraph', key: 'faq.whatToWearP2' },
      { type: 'paragraph', key: 'faq.whatToWearP3' },
      { type: 'paragraph', key: 'faq.whatToWearP4' },
    ],
  },
  {
    id: 'registry',
    questionKey: 'faq.registryQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.registryP1' },
      { type: 'paragraph', key: 'faq.registryP2' },
      { type: 'paragraph', key: 'faq.registryP3' },
    ],
  },
  {
    id: 'gettingThere',
    questionKey: 'faq.gettingThereQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.gettingThereP1' },
      {
        type: 'list',
        keys: ['faq.gettingThereLi1', 'faq.gettingThereLi2'],
      },
      { type: 'paragraph', key: 'faq.gettingThereP2' },
      { type: 'paragraph', key: 'faq.gettingThereP3' },
      { type: 'paragraph', key: 'faq.gettingThereP4' },
    ],
  },
  {
    id: 'parking',
    questionKey: 'faq.parkingQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.parkingP1' },
      { type: 'paragraph', key: 'faq.parkingP2' },
    ],
  },
  {
    id: 'outdoors',
    questionKey: 'faq.outdoorsQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.outdoorsP1' },
      { type: 'paragraph', key: 'faq.outdoorsP2' },
      { type: 'paragraph', key: 'faq.outdoorsP3' },
    ],
  },
  {
    id: 'rain',
    questionKey: 'faq.rainQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.rainP1' },
      { type: 'paragraph', key: 'faq.rainP2' },
      { type: 'paragraph', key: 'faq.rainP3' },
    ],
  },
  {
    id: 'dietary',
    questionKey: 'faq.dietaryQuestion',
    blocks: [{ type: 'paragraph', key: 'faq.dietaryP1' }],
  },
  {
    id: 'children',
    questionKey: 'faq.childrenQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.childrenP1' },
      { type: 'paragraph', key: 'faq.childrenP2' },
      { type: 'paragraph', key: 'faq.childrenP3' },
      { type: 'paragraph', key: 'faq.childrenP4' },
    ],
  },
  {
    id: 'photos',
    questionKey: 'faq.photosQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.photosP1' },
      { type: 'paragraph', key: 'faq.photosP2' },
      { type: 'paragraph', key: 'faq.photosP3' },
    ],
  },
  {
    id: 'partyEnd',
    questionKey: 'faq.partyEndQuestion',
    blocks: [
      { type: 'paragraph', key: 'faq.partyEndP2' },
    ],
  },
];
