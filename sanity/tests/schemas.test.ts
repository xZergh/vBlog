import {describe, expect, it} from 'vitest'
import {schemaTypes} from '../schemas'
import {blogType} from '../schemas/blog'
import {authorType} from '../schemas/author'

describe('schema exports', () => {
  it('includes blog and author schema types', () => {
    expect(schemaTypes).toEqual(expect.arrayContaining([blogType, authorType]))
  })

  it('blog schema has required core fields', () => {
    const fieldNames = (blogType.fields || []).map((field: {name: string}) => field.name)
    expect(fieldNames).toEqual(
      expect.arrayContaining(['title', 'slug', 'coverImage', 'content', 'author']),
    )
  })
})
