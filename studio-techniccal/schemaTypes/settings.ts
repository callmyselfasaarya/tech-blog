import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Publication Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'TECHNICCAL',
    }),
    defineField({
      name: 'description',
      title: 'Publication Subtitle',
      type: 'text',
      rows: 2,
    }),
  ],
})
