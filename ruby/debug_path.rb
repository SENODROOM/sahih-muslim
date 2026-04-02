#!/usr/bin/env ruby

# Debug script to check data paths and file loading

puts "=== Debug: Data Paths ==="

# Check current directory
puts "Current directory: #{Dir.pwd}"

# Check if data directory exists
data_path = File.join(Dir.pwd, 'data')
puts "Data path: #{data_path}"
puts "Data directory exists: #{Dir.exist?(data_path)}"

if Dir.exist?(data_path)
  puts "Files in data directory:"
  Dir.glob(File.join(data_path, '*')).each do |file|
    puts "  - #{file}"
  end
end

# Check lib directory
lib_path = File.join(Dir.pwd, 'lib')
puts "\nLib path: #{lib_path}"
puts "Lib directory exists: #{Dir.exist?(lib_path)}"

if Dir.exist?(lib_path)
  puts "Files in lib directory:"
  Dir.glob(File.join(lib_path, '**', '*')).select { |f| File.file?(f) }.each do |file|
    puts "  - #{file}"
  end
end

puts "\n=== Debug Complete ==="
