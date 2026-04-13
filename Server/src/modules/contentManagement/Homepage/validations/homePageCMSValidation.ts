import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';

export const updateHomePageValidation: ValidationChain[] = [
    // Hero Section
    body('hero.enabled').optional().isBoolean(),
    body('hero.headline').optional().trim().isString(),
    body('hero.subHeadline').optional().trim().isString(),
    body('hero.PrimaryCtaText').optional().trim().isString(),
    body('hero.PrimaryCtaLink').optional().trim().isString(),
    body('hero.images').optional().isArray(),

    // Streams Section
    body('streams.enabled').optional().isBoolean(),
    body('streams.title').optional().trim().isString(),
    body('streams.paragraph').optional().trim().isString(),
    body('streams.items').optional().isArray(),
    body('streams.items.*.name').optional().trim().isString(),
    body('streams.items.*.icon').optional().trim().isString(),

    // Content Blocks
    body('contentBlocks.enabled').optional().isBoolean(),
    body('contentBlocks.blocks').optional().isArray(),
    body('contentBlocks.blocks.*.title').optional().trim().isString(),
    body('contentBlocks.blocks.*.description').optional().trim().isString(),
    body('contentBlocks.blocks.*.image').optional().trim().isString(),
    body('contentBlocks.blocks.*.sectionKey').optional().trim().isString(),

    // Career Hub
    body('careerHub.enabled').optional().isBoolean(),
    body('careerHub.title').optional().trim().isString(),
    body('careerHub.paragraph').optional().trim().isString(),
    body('careerHub.images').optional().isArray(),
    body('careerHub.logo').optional().isArray(),

    // Location
    body('location.enabled').optional().isBoolean(),
    body('location.title').optional().trim().isString(),
    body('location.items').optional().isArray(),
    body('location.items.*.name').optional().trim().isString(),
    body('location.items.*.slug').optional().trim().isString(),
    body('location.items.*.image').optional().trim().isString(),
    body('location.items.*.isActive').optional().isBoolean(),

    // FAQ
    body('faq.enabled').optional().isBoolean(),
    body('faq.title').optional().trim().isString(),
    body('faq.paragraph').optional().trim().isString(),
    body('faq.items').optional().isArray(),
    body('faq.items.*.question').optional().trim().isString(),
    body('faq.items.*.answer').optional().trim().isString(),
];
