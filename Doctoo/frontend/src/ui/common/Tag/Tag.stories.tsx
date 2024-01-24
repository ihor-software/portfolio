import { Meta, Story } from '@storybook/react';
import Tag, { TagPropsType, TagTextType } from './Tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'UI/Common/Tag',
};

const Template: Story<TagPropsType> = args => <Tag {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Completed',
  onClose: undefined,
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Allergy',
  variant: TagTextType.Secondary,
};

export const Info = Template.bind({});
Info.args = {
  text: 'Planned',
  variant: TagTextType.Info,
  onClose: undefined,
};

export const Error = Template.bind({});
Error.args = {
  text: 'Canceled',
  variant: TagTextType.Error,
  onClose: undefined,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  text: '1 apple',
};

export default meta;
