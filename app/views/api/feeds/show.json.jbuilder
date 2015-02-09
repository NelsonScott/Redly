json.extract!(@feed, :id, :title, :url)
json.latest_entries do
  json.array!(@feed.latest_entries) do |entry|
    json.partial! 'api/entries/entry', entry: entry
  end
end
