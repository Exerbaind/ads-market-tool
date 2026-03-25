export type ChannelBotAdminRights = {
  can_delete_messages: boolean;
  can_delete_stories: boolean;
  can_edit_messages: boolean;
  can_edit_stories: boolean;
  can_post_messages: boolean;
  can_post_stories: boolean;
  can_promote_members: boolean;
};

export type Channel = {
  id: number;
  photo: string;
  title: string;
  username: string;
  bot_admin_rights: ChannelBotAdminRights;
};
