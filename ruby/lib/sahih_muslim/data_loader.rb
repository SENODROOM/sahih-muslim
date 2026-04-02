require 'json'
require 'yaml'

module SahihMuslim
  class DataLoader
    def initialize(data_path)
      @data_path = data_path
    end

    # Load hadith data from JSON or YAML files
    def load_hadiths
      hadiths = []
      
      # Try to load from muslim.json first (Sahih Muslim specific)
      muslim_json = File.join(@data_path, 'muslim.json')
      if File.exist?(muslim_json)
        hadiths = load_from_json(muslim_json)
      else
        # Try sahih_muslim.json
        json_file = File.join(@data_path, 'sahih_muslim.json')
        if File.exist?(json_file)
          hadiths = load_from_json(json_file)
        else
          # Try YAML
          yaml_file = File.join(@data_path, 'sahih_muslim.yml')
          if File.exist?(yaml_file)
            hadiths = load_from_yaml(yaml_file)
          else
            # Load from individual files
            hadiths = load_from_directory
          end
        end
      end

      hadiths.map { |data| create_hadith_from_data(data) }
    end

    private

    def load_from_json(file_path)
      data = JSON.parse(File.read(file_path))
      
      # Handle Sahih Muslim JSON structure
      if data.key?('hadiths') && data.key?('chapters')
        chapters_map = data['chapters'].map { |ch| [ch['id'], ch] }.to_h
        data['hadiths'].map do |hadith_data|
          chapter = chapters_map[hadith_data['chapterId']]
          {
            'number' => hadith_data['id'],
            'book_number' => hadith_data['chapterId'],
            'chapter' => chapter ? chapter['english'] : "Chapter #{hadith_data['chapterId']}",
            'arabic_text' => hadith_data['arabic'],
            'english_text' => hadith_data['english']['text'],
            'narrator' => hadith_data['english']['narrator'],
            'grades' => []
          }
        end
      else
        # Handle generic JSON structure
        data
      end
    end

    def load_from_yaml(file_path)
      YAML.load_file(file_path)
    end

    def load_from_directory
      hadiths = []
      Dir.glob(File.join(@data_path, '*.json')).each do |file|
        hadiths.concat(load_from_json(file))
      end
      hadiths
    end

    def create_hadith_from_data(data)
      Hadith.new(
        number: data['number'],
        book_number: data['book_number'],
        chapter: data['chapter'],
        arabic_text: data['arabic_text'],
        english_text: data['english_text'],
        narrator: data['narrator'],
        grades: data['grades'] || []
      )
    end
  end
end
