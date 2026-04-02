#!/usr/bin/env ruby

require_relative 'lib/sahih_muslim'

# Basic functionality test
puts "=== Sahih Muslim Ruby Gem Test ==="

begin
  # Initialize the client
  client = SahihMuslim.new
  puts "✓ Client initialized successfully"
  
  # Test getting books
  books = client.books
  puts "✓ Found #{books.length} books: #{books.first(5).join(', ')}..."
  
  # Test getting a random hadith
  random_hadith = client.random_hadith
  if random_hadith
    puts "✓ Random hadith: #{random_hadith.to_s}"
  else
    puts "⚠ No hadiths found - data files may be missing"
  end
  
  # Test search functionality
  search_results = client.search("prophet", limit: 3)
  puts "✓ Search for 'prophet' found #{search_results.length} results"
  
  puts "\n=== Test Complete ==="
  
rescue => e
  puts "✗ Error: #{e.message}"
  puts e.backtrace.first(5).join("\n")
end
