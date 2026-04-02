#!/usr/bin/env ruby

require_relative 'lib/sahih_muslim'

puts "Simple test - loading the gem..."

begin
  client = SahihMuslim.new
  puts "✓ Gem loaded successfully"
  puts "Total hadiths: #{client.collection.count}"
  puts "Available books: #{client.books.length}"
rescue => e
  puts "✗ Error: #{e.message}"
end
