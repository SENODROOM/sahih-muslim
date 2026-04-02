module SahihMuslim
  class Searcher
    def initialize(collection)
      @collection = collection
    end

    # Search hadith by text query
    def search(query, options = {})
      language = options[:language] || :english
      book = options[:book]
      limit = options[:limit]

      results = @collection.hadiths.select do |hadith|
        matches_query?(hadith, query, language) &&
        matches_book?(hadith, book)
      end

      results = results.first(limit) if limit
      results
    end

    # Search by narrator
    def search_by_narrator(narrator, options = {})
      limit = options[:limit]
      
      results = @collection.hadiths.select do |hadith|
        hadith.narrator&.downcase&.include?(narrator.downcase)
      end

      results = results.first(limit) if limit
      results
    end

    # Search by chapter
    def search_by_chapter(chapter_query, options = {})
      limit = options[:limit]
      
      results = @collection.hadiths.select do |hadith|
        hadith.chapter&.downcase&.include?(chapter_query.downcase)
      end

      results = results.first(limit) if limit
      results
    end

    private

    def matches_query?(hadith, query, language)
      text = hadith.text(language)
      text&.downcase&.include?(query.downcase) || false
    end

    def matches_book?(hadith, book)
      return true unless book
      hadith.book_number == book
    end
  end
end
