export const getSelected = (options, value) => {
  if (!value) return options[0]
  return options.filter(x => x.name === value).length > 0
    ? options.filter(x => x.name === value)[0]
    : options[0]
}

export const certificateOptions = [
  { id: 1, name: 'G' },
  { id: 2, name: 'PG' },
  { id: 3, name: 'PG-13' },
  { id: 4, name: 'R' },
  { id: 5, name: 'NC-17' },
  { id: 6, name: 'NR' }
]

export const statusOptions = [
  { id: 1, name: 'Draft' },
  { id: 2, name: 'Public' }
]

export const genreOptions = [
  { id: 1, title: 'Action', _id: 'Action' },
  { id: 2, title: 'Comedy', _id: 'Comedy' },
  { id: 3, title: 'Drama', _id: 'Drama' },
  { id: 4, title: 'Fantasy', _id: 'Fantasy' },
  { id: 5, title: 'Horror', _id: 'Horror' },
  { id: 6, title: 'Mystery', _id: 'Mystery' },
  { id: 7, title: 'Romance', _id: 'Romance' },
  { id: 8, title: 'Thriller', _id: 'Thriller' },
  { id: 9, title: 'Sci-Fi', _id: 'Sci-Fi' },
  { id: 10, title: 'Documentary', _id: 'Documentary' },
  { id: 11, title: 'Animation', _id: 'Animation' },
  { id: 12, title: 'Adventure', _id: 'Adventure' }
]
