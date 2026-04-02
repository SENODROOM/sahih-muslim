#!/usr/bin/env ruby

# Test path resolution and file loading

require_relative 'lib/sahih_muslim'

puts "=== Path Resolution Test ==="

begin
  # Test with default data path
  puts "Testing with default data path..."
  client1 = SahihMuslim.new
  puts "✓ Default path client created"
  
  # Test with custom data path
  custom_path = File.join(Dir.pwd, '..', 'data')
  puts "Testing with custom data path: #{custom_path}"
  client2 = SahihMuslim.new(data_path: custom_path)
  puts "✓ Custom path client created"
  
  # Test collection loading
  puts "Testing collection loading..."
  puts "Client1 hadith count: #{client1.collection.count}"
  puts "Client2 hadith count: #{client2.collection.count}"
  
rescue => e
  puts "✗ Error: #{e.message}"
  puts e.backtrace.first(3).join("\n")
end

puts "\n=== Path Test Complete ==="
