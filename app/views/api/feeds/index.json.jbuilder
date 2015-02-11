json.array!(@feeds) do |feed|
  json.partial!('feed', feed: feed)

  # json.latest_entries do
  #   json.array!(feed.latest_entries) do |entry|
  #     json.partial! 'api/entries/entry', entry: entry
  #   end
  # end
end
