json.array!(@entries) do |entry|
  json.partial!('entry', entry: entry)
end
