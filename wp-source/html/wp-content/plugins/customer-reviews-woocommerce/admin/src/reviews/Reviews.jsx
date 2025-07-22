import '../global.css'
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Card.css';
import '@mantine/core/styles/Grid.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/SimpleGrid.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Progress.css';
import '@mantine/core/styles/Skeleton.css';
import '@mantine/core/styles/Badge.css';
import '@mantine/core/styles/Table.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/Divider.css';
import { MantineProvider, Badge, Text, Progress, Card, Group, Box, SimpleGrid,
  Skeleton, Paper, Table, HoverCard, Anchor, Divider, Stack, rem
} from '@mantine/core';
import { IconHelp, IconStar, IconMessage, IconStarFilled, IconHeartRateMonitor,
  IconBroadcast, IconLockFilled, IconServer, IconSendOff, IconSend, IconHandClick,
  IconAdjustments, IconShoppingCart, IconThumbUp, IconEye, IconClick, IconArticle
} from '@tabler/icons-react';
import { __ } from '@wordpress/i18n';
import useSWR from "swr";
import classes from './reviews.module.css'

const fetcher = ( [url, nonce, hook] ) => {
  let formData = new FormData();
  formData.append( "action", hook );
  formData.append( "cr_nonce", nonce );
  return fetch(
    url,
    {
      method: "post",
      body: formData,
    }
  ).then(res => res.json());
};

function Reviews({ nonce, referrals }) {

  let ratingCard = {
    title: __( "Ratings", "customer-reviews-woocommerce" ),
    count: <Skeleton height={20} width="60%" radius="sm" className={classes.skel}/>,
    descr: __( "Average review rating", "customer-reviews-woocommerce" ),
    channel: __( "Ratings distribution", "customer-reviews-woocommerce" ),
    channelSegm: <Skeleton height={15} width="100%" radius="sm" mt={3} className={classes.skel}/>,
    channelDescr: [
      <Skeleton width="100%" radius="sm" className={classes.skel+" "+classes.skelDescr}><Text fz="xs">...</Text><Text size="xs">...</Text></Skeleton>,
      <Skeleton width="100%" radius="sm" className={classes.skel+" "+classes.skelDescr}><Text fz="xs">...</Text><Text size="xs">...</Text></Skeleton>,
      <Skeleton width="100%" radius="sm" className={classes.skel+" "+classes.skelDescr}><Text fz="xs">...</Text><Text size="xs">...</Text></Skeleton>,
      <Skeleton width="100%" radius="sm" className={classes.skel+" "+classes.skelDescr}><Text fz="xs">...</Text><Text size="xs">...</Text></Skeleton>,
      <Skeleton width="100%" radius="sm" className={classes.skel+" "+classes.skelDescr}><Text fz="xs">...</Text><Text size="xs">...</Text></Skeleton>
    ],
    class: classes.card
  };

  let reviewsCard = {
    title: __( "Reviews", "customer-reviews-woocommerce" ),
    count: <Skeleton height={20} width="60%" radius="sm" className={classes.skel}/>,
    descr: __( "Reviews received", "customer-reviews-woocommerce" ),
    sources: (
      <Box mt="sm">
        <Skeleton width="100%" height={12} radius="sm" mt="xs" pt={5} pb={10} className={classes.skel}>
          <Text size="xs">...</Text>
        </Skeleton>
        <Skeleton width="100%" height={12} radius="sm" mt="xs" pt={5} pb={10} className={classes.skel}>
          <Text size="xs">...</Text>
        </Skeleton>
      </Box>
    ),
    class: classes.card
  };

  let statusCard = {
    title: __( "Status", "customer-reviews-woocommerce" ),
    class: [classes.card, classes.statusCard],
    reviewRemindersTd1: (
      <Table.Td>
        <Skeleton width="100%" radius="sm" className={classes.skel}>
          <Text fz="xs">...</Text>
        </Skeleton>
      </Table.Td>
    ),
    reviewRemindersTd2: '',
    reminderSendingTd1: (
      <Table.Td>
        <Skeleton width="100%" radius="sm" className={classes.skel}>
          <Text fz="xs">...</Text>
        </Skeleton>
      </Table.Td>
    ),
    reminderSendingTd2: ''
  };

  let referralsCard = {
    title: __( "Recommendations", "customer-reviews-woocommerce" ),
    class: [classes.card, classes.statusCard],
    content: ""
  };
  let refsSWR;
  if ( referrals ) {
    referralsCard.content = (
      <Card withBorder padding="xs" className={referralsCard.class}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {referralsCard.title}
          </Text>
          <IconThumbUp size="1.4rem" stroke={1.5} className={classes.icon} />
        </Group>
        <Skeleton width="100%" radius="sm" mt={10} className={classes.skel}>
          <IconEye size="1.4rem" stroke={1.5} className={classes.iconReferrals} />
          <Text fz="xs">...</Text>
          <Text fz="sm">...</Text>
        </Skeleton>
      </Card>
    );
    refsSWR = useSWR(
      [ ajaxurl, nonce, "cr_get_reviews_top_row_refs" ],
      fetcher
    );
  }

  const statsSWR = useSWR(
    [ ajaxurl, nonce, "cr_get_reviews_top_row_stats" ],
    fetcher
  );
  if ( statsSWR.error ) return "An error has occurred.";
  if ( -1 == statsSWR.data ) return "Nonce has expired. Please refresh the page."
  if ( -2 == statsSWR.data ) return "No permissions to view the charts."

  if ( ! statsSWR.error && ! statsSWR.isLoading ) {
    // ratingCard
    ratingCard.count = <Text className={classes.value}>{statsSWR.data.average}</Text>;
    const segments = statsSWR.data.ratings.map((segment) => (
      <Progress.Section value={segment.part} className={classes[segment.class]} key={segment.label}>
        {segment.part > 10 && <Progress.Label fz="9">{segment.part}%</Progress.Label>}
      </Progress.Section>
    ));
    ratingCard.channelSegm = (
      <Progress.Root size={15} classNames={{ root: classes.progressWithSegments, label: classes.progressLabel }} mt={3} bg="#E1E1E1">
        {segments}
      </Progress.Root>
    );
    ratingCard.channelDescr = statsSWR.data.ratings.map((stat) => (
      <Box key={stat.label} className={classes.stat+' '+classes[stat.class]}>
        <Text tt="uppercase" fz="xs" c="dimmed" fw={700} className={classes.ratingSubTitle}>
          {stat.label}<IconStarFilled size="0.8rem" className={classes.icon} />
        </Text>
        <Group justify="space-between" align="flex-end" className={classes.channelDesc}>
          <Text fw={600} size="xs">{stat.count}</Text>
        </Group>
      </Box>
    ));
    // reviewsCard
    reviewsCard.count = <Text className={classes.value}>{statsSWR.data.total}</Text>;
    reviewsCard.sources = statsSWR.data.sources.map((source, i) => (
      <Box key={source.label} mt="sm" className={classes.progressBox}>
        <Group justify="space-between">
          <Text fz="xs">{source.label}</Text>
          <Text fz="xs">
            {source.part}%
          </Text>
        </Group>
        <Progress value={source.part} mt={5} classNames={{ section: classes[source.class] }} bg="#E1E1E1"/>
      </Box>
    ));
    // statusCard
    const statusCardIcons = {
      'IconAdjustments': IconAdjustments,
      'IconShoppingCart': IconShoppingCart
    }
    //
    let statusCardReviewRemindersIcon = <IconServer className={classes.statusCardBadgeIcon} />;
    let statusCardReviewRemindersGradient = { from: '#7b79e2', to: '#7b79e2', deg: 90 };
    let statusCardReviewRemindersHelp = [<Divider my="xs" />];
    statsSWR.data.status['reviewReminder'].helpLinks.forEach( (el) => {
      let IconTagNameVariable = statusCardIcons[el.icon];
      statusCardReviewRemindersHelp.push(
        <Group gap="5px">
          <IconTagNameVariable className={classes.settingsIcon} />
          <Anchor
            size="xs"
            href={el.link}
          >
            {el.label}
          </Anchor>
        </Group>
      );
    } );
    //
    let statusCardReminderSendingIcon = <IconSendOff className={classes.statusCardBadgeIcon} />
    let statusCardReminderSendingGradient = { from: '#da8fcc', to: '#da8fcc', deg: 90 };
    let statusCardReminderSendingHelp = [<Divider my="xs" />];
    statsSWR.data.status['reminderSending'].helpLinks.forEach( (el) => {
      let IconTagNameVariable = statusCardIcons[el.icon];
      statusCardReminderSendingHelp.push(
        <Group gap="5px">
          <IconTagNameVariable className={classes.settingsIcon} />
          <Anchor
            size="xs"
            href={el.link}
          >
            {el.label}
          </Anchor>
        </Group>
      );
    } );
    //
    switch (statsSWR.data.status['reviewReminder'].icon) {
      case 'IconBroadcast':
        statusCardReviewRemindersIcon = <IconBroadcast className={classes.statusCardBadgeIcon} />;
        statusCardReviewRemindersGradient = { from: '#7b79e2', to: '#da8fcc', deg: 90 };
        break;
      case 'IconLockFilled':
        statusCardReviewRemindersIcon = <IconLockFilled className={classes.statusCardBadgeIcon} />;
        statusCardReviewRemindersGradient = { from: '#da8fcc', to: '#da8fcc', deg: 90 };
        break;
      default:
        break;
    }
    switch (statsSWR.data.status['reminderSending'].icon) {
      case 'IconSend':
        statusCardReminderSendingIcon = <IconSend className={classes.statusCardBadgeIcon} />
        statusCardReminderSendingGradient = { from: '#7b79e2', to: '#da8fcc', deg: 90 };
        break;
      case 'IconHandClick':
        statusCardReminderSendingIcon = <IconHandClick className={classes.statusCardBadgeIcon} />
        statusCardReminderSendingGradient = { from: '#7b79e2', to: '#7b79e2', deg: 90 };
        break;
      default:
        break;
    }
    statusCard.reviewRemindersTd1 = (
      <Table.Td>
        <Badge
          variant="gradient"
          gradient={statusCardReviewRemindersGradient}
          leftSection={statusCardReviewRemindersIcon}
          size="xs"
          display="flex"
        >
          {statsSWR.data.status['reviewReminder'].label}
        </Badge>
      </Table.Td>
    );
    statusCard.reviewRemindersTd2 = (
      <Table.Td>
        <Group gap="5px">
          <Text fz="xs">
            Review reminders
          </Text>
          <HoverCard width={280} shadow="md" withArrow>
            <HoverCard.Target>
              <IconHelp className={classes.helpIcon} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="xs">
                {statsSWR.data.status['reviewReminder'].help}
              </Text>
              {statusCardReviewRemindersHelp}
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Table.Td>
    );
    statusCard.reminderSendingTd1 = (
      <Table.Td>
        <Badge
          variant="gradient"
          gradient={statusCardReminderSendingGradient}
          leftSection={statusCardReminderSendingIcon}
          size="xs"
          display="flex"
          bd="0px"
        >
          {statsSWR.data.status['reminderSending'].label}
        </Badge>
      </Table.Td>
    );
    statusCard.reminderSendingTd2 = (
      <Table.Td>
        <Group gap="5px">
          <Text fz="xs">
            Reminder sending
          </Text>
          <HoverCard width={280} shadow="md" withArrow>
            <HoverCard.Target>
              <IconHelp className={classes.helpIcon} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="xs">
                {statsSWR.data.status['reminderSending'].help}
              </Text>
              {statusCardReminderSendingHelp}
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Table.Td>
    );
  }

  if ( referrals && refsSWR && ! refsSWR.error && ! refsSWR.isLoading ) {
    // referralsCard
    let referralsCardContent = '';
    if ( -1 == refsSWR.data ) {
      referralsCardContent = <Text size="xs" mt={10}>Nonce has expired. Please refresh the page.</Text>;
    } else if ( -2 == refsSWR.data ) {
      referralsCardContent = <Text size="xs" mt={10}>No permissions to view the charts.</Text>;
    } else if ( -3 == refsSWR.data ) {
      referralsCardContent = <Text size="xs" mt={10}>No license key was found in the plugin settings.</Text>;
    } else if ( -4 == refsSWR.data ) {
      referralsCardContent = <Text size="xs" mt={10}>Product recommendation statistics could not be retrieved.</Text>;
    } else {
      referralsCardContent = (
        <Group justify="space-evenly" mt={10}>
          <div className={classes.subContReferrals}>
            <IconEye size="1.4rem" stroke={1.5} className={classes.iconReferrals} />
            <div>
              <Group gap="5px" justify="center">
                <Text c="dimmed" fz="xs">
                  {refsSWR.data.referralViews.label}
                </Text>
                <HoverCard width={280} shadow="md" withArrow>
                  <HoverCard.Target>
                    <IconHelp className={classes.helpIcon} color="var(--mantine-color-gray-6)" />
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="xs">
                      {refsSWR.data.referralViews.help}
                    </Text>
                    <Divider my="xs" />
                    <Group gap="5px">
                      <IconArticle className={classes.settingsIcon} />
                      <Anchor
                        size="xs"
                        href={refsSWR.data.referralViews.helpLinks.link}
                      >
                        {refsSWR.data.referralViews.helpLinks.label}
                      </Anchor>
                    </Group>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Group>
              <Text fz="sm" fw={600}>{refsSWR.data.referralViews.count}</Text>
            </div>
          </div>
          <div className={classes.subContReferrals}>
            <IconClick size="1.4rem" stroke={1.5} className={classes.iconReferrals} />
            <div>
              <Group gap="5px" justify="center">
                <Text c="dimmed" fz="xs">
                  {refsSWR.data.referralClicks.label}
                </Text>
                <HoverCard width={280} shadow="md" withArrow>
                  <HoverCard.Target>
                    <IconHelp className={classes.helpIcon} color="var(--mantine-color-gray-6)" />
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="xs">
                      {refsSWR.data.referralClicks.help}
                    </Text>
                    <Divider my="xs" />
                    <Group gap="5px">
                      <IconArticle className={classes.settingsIcon} />
                      <Anchor
                        size="xs"
                        href={refsSWR.data.referralClicks.helpLinks.link}
                      >
                        {refsSWR.data.referralClicks.helpLinks.label}
                      </Anchor>
                    </Group>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Group>
              <Text fz="sm" fw={600}>{refsSWR.data.referralClicks.count}</Text>
            </div>
          </div>
        </Group>
      );
    }
    referralsCard.content = (
      <Card withBorder padding="xs" className={referralsCard.class}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {referralsCard.title}
          </Text>
          <IconThumbUp size="1.4rem" stroke={1.5} className={classes.icon} />
        </Group>
        {referralsCardContent}
      </Card>
    );
  }

  return (
    <MantineProvider>
      <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="sm" w="100%" maw="800px" className={classes.topGrid}>
        <Card withBorder padding="xs" className={ratingCard.class}>
          <Group justify="space-between">
            <Text size="xs" c="dimmed" className={classes.title}>
              {ratingCard.title}
            </Text>
            <IconStar size="1.4rem" stroke={1.5} className={classes.icon} />
          </Group>

          <Group align="flex-end" mt={20}>
            {ratingCard.count}
          </Group>

          <Text c="dimmed" fz="xs" mt="7">
            {ratingCard.descr}
          </Text>

          <Text fz="xs" mt="sm">
            {ratingCard.channel}
          </Text>

          {ratingCard.channelSegm}

          <SimpleGrid cols={5} mt="xs">
            {ratingCard.channelDescr}
          </SimpleGrid>
        </Card>
        <Card withBorder padding="xs" className={reviewsCard.class}>
          <Group justify="space-between">
            <Text size="xs" c="dimmed" className={classes.title}>
              {reviewsCard.title}
            </Text>
            <IconMessage size="1.4rem" stroke={1.5} className={classes.icon} />
          </Group>

          <Group align="flex-end" mt={20}>
            {reviewsCard.count}
          </Group>

          <Text c="dimmed" fz="xs" mt="7">
            {reviewsCard.descr}
          </Text>

          {reviewsCard.sources}
        </Card>
        <Stack
          align="stretch"
          justify="flex-start"
          gap="xs"
        >
          <Card withBorder padding="xs" className={statusCard.class}>
            <Group justify="space-between">
              <Text size="xs" c="dimmed" className={classes.title}>
                {statusCard.title}
              </Text>
              <IconHeartRateMonitor size="1.4rem" stroke={1.5} className={classes.icon} />
            </Group>
            <Table horizontalSpacing="0" verticalSpacing="0" mt={20} withRowBorders={false} className={classes.statusTable}>
              <Table.Tbody>
                <Table.Tr>
                  {statusCard.reviewRemindersTd1}
                  {statusCard.reviewRemindersTd2}
                </Table.Tr>
                <Table.Tr>
                  {statusCard.reminderSendingTd1}
                  {statusCard.reminderSendingTd2}
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>
          {referralsCard.content}
        </Stack>
      </SimpleGrid>
    </MantineProvider>
  );
}

export default Reviews
