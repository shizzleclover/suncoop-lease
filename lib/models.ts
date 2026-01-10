import mongoose, { Schema, Document } from 'mongoose'

// Site Content Schema (for hero, glow, footer, pricing, etc.)
export interface ISiteContent extends Document {
    _id: string
    // Hero fields
    headline?: string
    subheadline?: string
    ctaText?: string
    ctaLink?: string
    benefits?: string[]
    backgroundColor?: string
    textColor?: string
    buttonColor?: string
    buttonTextColor?: string
    backgroundImage?: string
    // Glow fields
    title?: string
    description?: string
    highlightWord?: string
    highlightColor?: string
    image?: string
    // Footer fields
    phone?: string
    email?: string
    whatsapp?: string
    tagline?: string
    accentColor?: string
    facebookUrl?: string
    instagramUrl?: string
    linkedinUrl?: string
    twitterUrl?: string
    // Pricing fields
    plans?: Array<{
        name: string
        subtitle?: string
        price: string
        period: string
        features: string[]
        popular: boolean
        ctaText: string
        ctaLink: string
    }>
    style?: {
        backgroundColor?: string
        cardColor?: string
        popularColor?: string
        textColor?: string
    }
    // Generic
    features?: Array<{
        title: string
        subtitle: string
    }>
    updatedAt: Date
}

const SiteContentSchema = new Schema<ISiteContent>({
    _id: { type: String, required: true },
    // Hero
    headline: String,
    subheadline: String,
    ctaText: String,
    ctaLink: String,
    benefits: [String],
    backgroundColor: String,
    textColor: String,
    buttonColor: String,
    buttonTextColor: String,
    backgroundImage: String,
    // Glow
    title: String,
    description: String,
    highlightWord: String,
    highlightColor: String,
    image: String,
    // Footer
    phone: String,
    email: String,
    whatsapp: String,
    tagline: String,
    accentColor: String,
    facebookUrl: String,
    instagramUrl: String,
    linkedinUrl: String,
    twitterUrl: String,
    // Pricing
    plans: [{
        name: String,
        subtitle: String,
        price: String,
        period: String,
        features: [String],
        popular: Boolean,
        ctaText: String,
        ctaLink: String
    }],
    style: {
        backgroundColor: String,
        cardColor: String,
        popularColor: String,
        textColor: String
    },
    // Generic
    features: [{
        title: String,
        subtitle: String
    }],
    updatedAt: { type: Date, default: Date.now }
}, { _id: false })

// FAQ Item Schema
export interface IFaqItem extends Document {
    group: string
    question: string
    answer: string
    order: number
    pageType: 'main' | 'flexpay'
}

const FaqItemSchema = new Schema<IFaqItem>({
    group: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    pageType: { type: String, enum: ['main', 'flexpay'], default: 'main' }
})

// Benefit Schema
export interface IBenefit extends Document {
    title: string
    subtitle: string
    iconType: string
    iconImage?: string
    order: number
    pageType: 'main' | 'flexpay'
}

const BenefitSchema = new Schema<IBenefit>({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    iconType: { type: String, required: true },
    iconImage: String,
    order: { type: Number, default: 0 },
    pageType: { type: String, enum: ['main', 'flexpay'], default: 'main' }
})

// Custom Section Schema
export interface ICustomSection extends Document {
    title: string
    content: string
    image?: string
    visible: boolean
    order: number
    backgroundColor: string
    textColor: string
    layout: 'text-left' | 'text-right' | 'centered'
}

const CustomSectionSchema = new Schema<ICustomSection>({
    title: { type: String, required: true },
    content: { type: String, default: '' },
    image: String,
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    backgroundColor: { type: String, default: '#ffffff' },
    textColor: { type: String, default: '#000000' },
    layout: { type: String, enum: ['text-left', 'text-right', 'centered'], default: 'text-left' }
})

// Export models
export const SiteContent = mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema)
export const FaqItem = mongoose.models.FaqItem || mongoose.model<IFaqItem>('FaqItem', FaqItemSchema)
export const Benefit = mongoose.models.Benefit || mongoose.model<IBenefit>('Benefit', BenefitSchema)
export const CustomSection = mongoose.models.CustomSection || mongoose.model<ICustomSection>('CustomSection', CustomSectionSchema)
