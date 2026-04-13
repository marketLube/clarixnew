import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const updateAboutCMSValidation: ValidationChain[] = [
    // Hero Section
    body('hero.enabled').optional().isBoolean(),
    body('hero.headline').optional().trim().isString(),
    body('hero.subHeadline').optional().trim().isString(),

    // Second Section
    body('secondSection.enabled').optional().isBoolean(),
    body('secondSection.headline').optional().trim().isString(),
    body('secondSection.paragraph').optional().trim().isString(),
    body('secondSection.mission').optional().trim().isString(),
    body('secondSection.vision').optional().trim().isString(),
    body('secondSection.image').optional().trim().isString(),

    // Third Section
    body('thirdSection.enabled').optional().isBoolean(),
    body('thirdSection.headline').optional().trim().isString(),
    body('thirdSection.paragraph').optional().trim().isString(),
    body('thirdSection.cards').optional().isArray(),
    body('thirdSection.cards.*.title').optional().trim().isString(),
    body('thirdSection.cards.*.description').optional().trim().isString(),
    body('thirdSection.cards.*.icon').optional().trim().isString(),

    // Fourth Section
    body('fourthSection.enabled').optional().isBoolean(),
    body('fourthSection.headline').optional().trim().isString(),
    body('fourthSection.paragraph').optional().trim().isString(),
    body('fourthSection.image').optional().trim().isString(),

    // Key Statistics
    body('keyStatistics.enabled').optional().isBoolean(),
    body('keyStatistics.stats').optional().isArray(),
    body('keyStatistics.stats.*.label').optional().trim().isString(),
    body('keyStatistics.stats.*.value').optional().trim().isString(),

    body('status').optional().isIn(['draft', 'published']),
];
