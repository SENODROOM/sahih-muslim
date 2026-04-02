# Sahih Muslim Ruby Gem

A comprehensive Ruby package for accessing and searching through the Sahih Muslim hadith collection.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'sahih_muslim'
```

And then execute:
```bash
bundle install
```

Or install it yourself as:
```bash
gem install sahih_muslim
```

## Usage

### Basic Usage

```ruby
require 'sahih_muslim'

# Initialize the client
client = SahihMuslim.new

# Get a specific hadith
hadith = client.get_hadith(1)
puts hadith.english_text

# Get random hadith
random_hadith = client.random_hadith
puts random_hadith.to_s

# Search hadith
results = client.search("prophet", limit: 10)
results.each { |h| puts h.to_s }
```

### Advanced Usage

```ruby
# Get all hadith from a specific book
book_hadiths = client.get_book(1)

# Search with options
results = client.search("prayer", 
  language: :english, 
  book: 1, 
  limit: 5
)

# Search by narrator
searcher = SahihMuslim::Searcher.new(client.collection)
narrator_results = searcher.search_by_narrator("Abu Hurairah")

# Get hadith text in different languages
hadith.text(:english)  # English translation
hadith.text(:arabic)   # Arabic text
hadith.text(:both)     # Both languages
```

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake test` to run the tests.

You can also run `bin/console` for an interactive prompt that will allow you to experiment.

## Testing

Run the test files to verify functionality:

```bash
ruby test.rb
ruby simple_test.rb
ruby final_test.rb
```

## Data Files

The gem expects hadith data to be available in the `data/` directory. It supports:
- JSON files (`sahih_muslim.json`)
- YAML files (`sahih_muslim.yml`)
- Multiple JSON files in the data directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## License

The gem is available as open source under the terms of the MIT License.
