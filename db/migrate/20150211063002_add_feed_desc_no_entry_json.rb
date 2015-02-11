class AddFeedDescNoEntryJson < ActiveRecord::Migration
  def change
    remove_column :entries, :json
    add_column :feeds, :description, :text
  end
end
