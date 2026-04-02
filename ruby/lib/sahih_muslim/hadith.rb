module SahihMuslim
  class Hadith
    attr_reader :number, :book_number, :chapter, :arabic_text, :english_text, :narrator, :grades

    def initialize(number:, book_number:, chapter:, arabic_text:, english_text:, narrator:, grades: [])
      @number = number
      @book_number = book_number
      @chapter = chapter
      @arabic_text = arabic_text
      @english_text = english_text
      @narrator = narrator
      @grades = grades
    end

    # Check if hadith contains specific text
    def contains?(query)
      text_to_search = "#{@english_text} #{@arabic_text} #{@narrator}"
      text_to_search.downcase.include?(query.downcase)
    end

    # Get hadith in specified language
    def text(language = :english)
      case language
      when :english
        @english_text
      when :arabic
        @arabic_text
      when :both
        "Arabic: #{@arabic_text}\n\nEnglish: #{@english_text}"
      else
        raise ArgumentError, "Unsupported language: #{language}"
      end
    end

    # Convert to hash representation
    def to_h
      {
        number: @number,
        book_number: @book_number,
        chapter: @chapter,
        arabic_text: @arabic_text,
        english_text: @english_text,
        narrator: @narrator,
        grades: @grades
      }
    end

    # String representation
    def to_s
      "Hadith #{@number} (Book #{@book_number}): #{@english_text[0..100]}..."
    end
  end
end
