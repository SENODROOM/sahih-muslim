module SahihMuslim
  class Collection
    attr_reader :hadiths, :books

    def initialize(data_path: nil)
      @data_path = data_path || default_data_path
      @hadiths = []
      @books = {}
      load_data
    end

    # Get a specific hadith by number
    def get_hadith(number)
      @hadiths.find { |hadith| hadith.number == number }
    end

    # Get all hadith from a specific book
    def get_book(book_number)
      @books[book_number] || @hadiths.select { |hadith| hadith.book_number == book_number }
    end

    # Get random hadith
    def random_hadith
      @hadiths.sample
    end

    # Get all available books
    def books
      @books.keys.sort
    end

    # Get total number of hadith
    def count
      @hadiths.length
    end

    private

    def default_data_path
      File.join(File.dirname(__dir__), '..', 'data')
    end

    def load_data
      loader = DataLoader.new(@data_path)
      @hadiths = loader.load_hadiths
      organize_books
    end

    def organize_books
      @hadiths.each do |hadith|
        book_num = hadith.book_number
        @books[book_num] ||= []
        @books[book_num] << hadith
      end
    end
  end
end
