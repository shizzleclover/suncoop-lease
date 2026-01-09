import mongoose, { Schema, Document } from 'mongoose'

// Site Content Schema (for hero, glow, sunny-side, footer, etc.)
export interface ISiteContent extends Document {
    _id: string
    headline?: string
    subheadline?: string
    ctaText?: string
    benefits?: string[]
    title?: string
    description?: string
    features?: Array<{
        title: string
        subtitle: string
    }>
    contactPhone?: string
    contactEmail?: string
    updatedAt: Date
}

const SiteContentSchema = new Schema<ISiteContent>({
    _id: { type: String, required: true },
    headline: String,
    subheadline: String,
    ctaText: String,
    benefits: [String],
    title: String,
    description: String,
    features: [{
        title: String,
        subtitle: String
    }],
    contactPhone: String,
    contactEmail: String,
    updatedAt: { type: Date, default: Date.now }
}, { _id: false })

// FAQ Item Schema
export interface IFaqItem extends Document {
    group: string
    question: string
    answer: string
    order: number
}

const FaqItemSchema = new Schema<IFaqItem>({
    group: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 }
})

// Benefit Schema
export interface IBenefit extends Document {
    title: string
    subtitle: string
    iconType: string
    order: number
}

const BenefitSchema = new Schema<IBenefit>({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    iconType: { type: String, required: true },
    order: { type: Number, default: 0 }
})

// Pricing Plan Schema
export interface IPricingPlan extends Document {
    name: string
    price: string
    features: string[]
    isPopular: boolean
    order: number
}

const PricingPlanSchema = new Schema<IPricingPlan>({
    name: { type: String, required: true },
    price: { type: String, required: true },
    features: [String],
    isPopular: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
})

// Custom Section Schema
export interface ICustomSection extends Document {
    name: string
    type: 'cards' | 'text-image' | 'banner' | 'list'
    title: string
    subtitle?: string
    backgroundColor: string
    content: any[]
    imageUrl?: string
    order: number
    isActive: boolean
}

const CustomSectionSchema = new Schema<ICustomSection>({
    name: { type: String, required: true },
    type: { type: String, enum: ['cards', 'text-image', 'banner', 'list'], required: true },
    title: { type: String, required: true },
    subtitle: String,
    backgroundColor: { type: String, default: '#ffffff' },
    content: { type: Schema.Types.Mixed, default: [] },
    imageUrl: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
})

// Export models
export const SiteContent = mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema)
export const FaqItem = mongoose.models.FaqItem || mongoose.model<IFaqItem>('FaqItem', FaqItemSchema)
export const Benefit = mongoose.models.Benefit || mongoose.model<IBenefit>('Benefit', BenefitSchema)
export const PricingPlan = mongoose.models.PricingPlan || mongoose.model<IPricingPlan>('PricingPlan', PricingPlanSchema)
export const CustomSection = mongoose.models.CustomSection || mongoose.model<ICustomSection>('CustomSection', CustomSectionSchema)
