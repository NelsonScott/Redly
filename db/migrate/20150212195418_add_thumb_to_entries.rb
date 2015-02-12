class AddThumbToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :image_thumb, :string
  end
end
