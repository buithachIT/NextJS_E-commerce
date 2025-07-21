import { createRoot } from '@wordpress/element';
import Reviews from './reviews/Reviews.jsx'
import Reminders from './Reminders.jsx'

// Reviews page
const elReviews = document.getElementById( 'cr_reviews_top_charts' );
if ( elReviews ) {
  const reviewCharts = createRoot( elReviews );
  reviewCharts.render(
    <Reviews
      nonce={elReviews.getAttribute('data-nonce')}
      referrals={elReviews.getAttribute('data-referrals')}
    />
  );
}

// Reminders page
const elReminders = document.getElementById( 'cr_reminders_top_charts' );
if ( elReminders ) {
  const reminderCharts = createRoot( elReminders );
  reminderCharts.render( <Reminders nonce={elReminders.getAttribute('data-nonce')} tab={elReminders.getAttribute('data-tab')} /> );
}
