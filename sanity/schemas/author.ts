import { defineType, defineField } from 'sanity'

export const authorType = defineType({
  name: 'author',
  type: 'document',
  title: 'Author',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Bio',
      description: 'Short biography of the author',
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: 'email',
      type: 'email',
      title: 'Email',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      type: 'object',
      title: 'Social Links',
      fields: [
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter',
        },
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
        },
        {
          name: 'github',
          type: 'url',
          title: 'GitHub',
        },
        {
          name: 'website',
          type: 'url',
          title: 'Website',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'avatar',
    },
  },
})
