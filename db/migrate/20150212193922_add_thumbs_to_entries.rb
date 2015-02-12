class AddThumbsToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :image_thumbs, :string
  end
end
