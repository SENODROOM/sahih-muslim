require_relative "sahih_muslim/version"
require_relative "sahih_muslim/hadith"
require_relative "sahih_muslim/collection"
require_relative "sahih_muslim/searcher"
require_relative "sahih_muslim/data_loader"

module SahihMuslim
  class Error < StandardError; end

  # Main entry point for accessing Sahih Muslim hadith collection
  class Client
    attr_reader :collection

    def initialize(data_path: nil)
      @collection = Collection.new(data_path: data_path)
    end

    # Get a specific hadith by number
    def get_hadith(number)
      @collection.get_hadith(number)
    end

    # Search hadith by text
    def search(query, options = {})
      searcher = Searcher.new(@collection)
      searcher.search(query, options)
    end

    # Get all hadith from a specific book
    def get_book(book_number)
      @collection.get_book(book_number)
    end

    # Get all available books
    def books
      @collection.books
    end

    # Get random hadith
    def random_hadith
      @collection.random_hadith
    end
  end

  # Convenience method for creating a new client
  def self.new(data_path: nil)
    Client.new(data_path: data_path)
  end
end
