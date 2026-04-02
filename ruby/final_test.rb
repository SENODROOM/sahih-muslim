#!/usr/bin/env ruby

require_relative 'lib/sahih_muslim'

puts "=== Final Comprehensive Test ==="

begin
  # Initialize client
  client = SahihMuslim.new
  puts "✓ Client initialized"
  
  # Test basic functionality
  puts "\n--- Basic Functionality ---"
  puts "Total hadiths: #{client.collection.count}"
  puts "Number of books: #{client.books.length}"
  
  # Test getting a specific hadith
  puts "\n--- Hadith Retrieval ---"
  hadith = client.get_hadith(1)
  if hadith
    puts "✓ Retrieved hadith 1: #{hadith.to_s}"
  else
    puts "⚠ Hadith 1 not found"
  end
  
  # Test random hadith
  random = client.random_hadith
  if random
    puts "✓ Random hadith: #{random.to_s}"
  else
    puts "⚠ No random hadith available"
  end
  
  # Test search
  puts "\n--- Search Functionality ---"
  search_results = client.search("allah", limit: 5)
  puts "✓ Search for 'allah' found #{search_results.length} results"
  
  # Test book retrieval
  puts "\n--- Book Functionality ---"
  first_book = client.books.first
  if first_book
    book_hadiths = client.get_book(first_book)
    puts "✓ Book #{first_book} has #{book_hadiths.length} hadiths"
  end
  
  # Test narrator search
  puts "\n--- Advanced Search ---"
  searcher = SahihMuslim::Searcher.new(client.collection)
  narrator_results = searcher.search_by_narrator("abu", limit: 3)
  puts "✓ Narrator search found #{narrator_results.length} results"
  
  puts "\n=== All Tests Passed ==="
  
rescue => e
  puts "✗ Test failed: #{e.message}"
  puts e.backtrace.first(5).join("\n")
end
