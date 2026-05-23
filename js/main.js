/**
 * VIF.Dev Portfolio - Main Application Entry Point
 * Initializes all modules and manages application lifecycle
 */

(function() {
  'use strict';

  /**
   * Main application configuration
   */
  const AppConfig = {
    components: [
      { name: 'navbar', target: '#navbar-placeholder' },
      { name: 'hero', target: '#hero-placeholder' },
      { name: 'about', target: '#about-placeholder' },
      { name: 'personality', target: '#personality-placeholder' },
      { name: 'skills', target: '#skills-placeholder' },
      { name: 'education', target: '#education-placeholder' },
      { name: 'certifications', target: '#certifications-placeholder' },
      { name: 'projects', target: '#projects-placeholder' },
      { name: 'contact', target: '#contact-placeholder' },
      { name: 'footer', target: '#footer-placeholder' }
    ],
    debug: false // Disabled for production
  };

  /**
   * Log helper for debugging
   */
  function log(message, type = 'info') {
    if (!AppConfig.debug && type !== 'error') return;
    
    const styles = {
      info: 'color: #00d4ff',
      success: 'color: #22c55e',
      warning: 'color: #f59e0b',
      error: 'color: #ef4444'
    };

    console[type === 'error' ? 'error' : 'log'](
      `%c[VIF.Dev] ${message}`,
      styles[type] || styles.info
    );
  }

  /**
   * Initialize application
   */
  async function initApp() {
    log('🚀 Initializing VIF.Dev Portfolio...', 'info');

    try {
      // Check if we're using component loading or static HTML
      const hasPlaceholders = document.querySelector('#navbar-placeholder');
      
      if (hasPlaceholders && window.componentLoader) {
        // Dynamic component loading
        log('Loading components dynamically...', 'info');
        await window.componentLoader.loadComponents(AppConfig.components);
      }

      // Initialize modules after components are loaded
      initModules();

      log('✅ Portfolio initialized successfully!', 'success');

    } catch (error) {
      log(`❌ Initialization error: ${error.message}`, 'error');
      console.error(error);
    }
  }

  /**
   * Initialize all modules
   */
  function initModules() {
    // Initialize Animation Manager
    if (window.animationManager) {
      window.animationManager.init();
      log('Animations initialized', 'info');
    }

    // Initialize Navigation Manager
    if (window.navigationManager) {
      window.navigationManager.init();
      log('Navigation initialized', 'info');
    }

    // Initialize Interactive Components
    if (window.interactiveComponents) {
      window.interactiveComponents.init();
      log('Interactive components initialized', 'info');
    }

    // Initialize Konami Code Easter Egg
    if (window.KonamiCode) {
      window.KonamiCode.init();
    }

    // Page load animation
    initPageLoadAnimation();

    // Initialize stat counters
    initStatCounters();

    // Apply loading optimizations to dynamically injected media
    optimizeDeferredMedia();

    // Initialize live GitHub activity widget
    initGitHubActivity();
  }

  /**
   * Page load fade-in animation
   */
  function initPageLoadAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  }

  /**
   * Initialize animated stat counters
   */
  function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0 || !window.Utils) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const targetValue = parseInt(element.textContent.replace(/\D/g, ''), 10);
          
          if (!isNaN(targetValue)) {
            const suffix = element.textContent.replace(/[0-9]/g, '');
            
            window.Utils.animateNumber(element, targetValue, 1500);
            
            // Add suffix back after animation
            setTimeout(() => {
              element.textContent = targetValue + suffix;
            }, 1600);
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
  }

  /**
   * Handle visibility change (pause animations when tab is hidden)
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      // Pause animations when tab is hidden
      document.body.classList.add('animations-paused');
    } else {
      // Resume animations when tab is visible
      document.body.classList.remove('animations-paused');
    }
  }

  /**
   * Apply non-critical image loading defaults for better first render performance
   */
  function optimizeDeferredMedia() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  /**
   * Initialize live GitHub activity data
   */
  async function initGitHubActivity() {
    const widget = document.querySelector('.github-live-panel[data-github-username]');

    if (!widget) {
      return;
    }

    const username = widget.dataset.githubUsername || 'AwfulLumos';
    const badge = widget.querySelector('[data-github-badge]');
    const lastUpdated = widget.querySelector('[data-github-last-updated]');
    const latestActivity = widget.querySelector('[data-github-latest-activity]');
    const latestDetails = widget.querySelector('[data-github-latest-details]');
    const publicRepos = widget.querySelector('[data-github-public-repos]');
    const followers = widget.querySelector('[data-github-followers]');
    const weeklyEvents = widget.querySelector('[data-github-weekly-events]');
    const weeklySummary = widget.querySelector('[data-github-weekly-summary]');
    const activityNote = widget.querySelector('[data-github-activity-note]');
    const eventList = widget.querySelector('[data-github-event-list]');

    if (!badge || !lastUpdated || !latestActivity || !latestDetails || !publicRepos || !followers || !weeklyEvents || !weeklySummary || !activityNote || !eventList) {
      return;
    }

    const apiBase = `https://api.github.com/users/${encodeURIComponent(username)}`;
    const requestOptions = {
      headers: {
        Accept: 'application/vnd.github+json'
      },
      cache: 'no-store'
    };

    try {
      const [profileResponse, eventsResponse] = await Promise.all([
        fetch(apiBase, requestOptions),
        fetch(`${apiBase}/events/public?per_page=30`, requestOptions)
      ]);

      if (!profileResponse.ok || !eventsResponse.ok) {
        throw new Error('GitHub API request failed');
      }

      const profile = await profileResponse.json();
      const events = await eventsResponse.json();
      const now = Date.now();
      const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
      const recentEvents = events.filter((event) => new Date(event.created_at).getTime() >= sevenDaysAgo);
      const latestEvent = events[0];

      publicRepos.textContent = profile.public_repos ?? '--';
      followers.textContent = `Followers: ${profile.followers ?? '--'}`;
      weeklyEvents.textContent = recentEvents.length.toString();

      if (latestEvent) {
        const latestEventTime = new Date(latestEvent.created_at).getTime();
        const hoursAgo = Math.max(0, Math.round((now - latestEventTime) / (60 * 60 * 1000)));
        const daysAgo = Math.max(0, Math.round((now - latestEventTime) / (24 * 60 * 60 * 1000)));
        const repoName = latestEvent.repo?.name ? latestEvent.repo.name.split('/').pop() : 'repository';
        const relativeTime = formatRelativeTime(latestEvent.created_at);

        badge.textContent = hoursAgo < 1
          ? 'Active now'
          : hoursAgo < 24
            ? `Active ${hoursAgo}h ago`
            : `Last active ${daysAgo}d ago`;
        badge.classList.toggle('is-active', hoursAgo < 24);
        badge.classList.toggle('is-idle', hoursAgo >= 24);

        latestActivity.textContent = formatGitHubEventHeadline(latestEvent, repoName);
        latestDetails.textContent = `${relativeTime} • ${repoName}`;
        weeklySummary.textContent = recentEvents.length > 0
          ? `${recentEvents.length} public event${recentEvents.length === 1 ? '' : 's'} in the last 7 days`
          : 'No public events in the last 7 days';

        activityNote.textContent = latestEvent.type.replace(/Event$/, '').replace(/([a-z])([A-Z])/g, '$1 $2');
      } else {
        badge.textContent = 'No recent public activity';
        badge.classList.remove('is-active');
        badge.classList.add('is-idle');
        latestActivity.textContent = 'No public events found';
        latestDetails.textContent = 'GitHub did not return recent public activity.';
        weeklySummary.textContent = 'No public events in the last 7 days';
        activityNote.textContent = 'Public events unavailable';
      }

      lastUpdated.textContent = 'Updated just now';
      renderGitHubEvents(eventList, events.slice(0, 4));
    } catch (error) {
      badge.textContent = 'Live data unavailable';
      badge.classList.add('is-idle');
      lastUpdated.textContent = 'Could not refresh GitHub activity';
      latestActivity.textContent = 'Unable to load live GitHub activity';
      latestDetails.textContent = 'Showing the fallback message until GitHub responds again.';
      publicRepos.textContent = '--';
      followers.textContent = 'Followers: --';
      weeklyEvents.textContent = '--';
      weeklySummary.textContent = 'GitHub API request failed';
      activityNote.textContent = 'Fallback mode';
      eventList.innerHTML = '<li class="github-live-empty error">Live GitHub activity could not be loaded right now.</li>';
      log(`GitHub activity error: ${error.message}`, 'warning');
    }
  }

  /**
   * Format the latest GitHub event headline
   */
  function formatGitHubEventHeadline(event, repoName) {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed to ${repoName}`;
      case 'PullRequestEvent':
        return `${capitalizeFirst(event.payload?.action || 'updated')} pull request in ${repoName}`;
      case 'IssuesEvent':
        return `${capitalizeFirst(event.payload?.action || 'updated')} issue in ${repoName}`;
      case 'CreateEvent':
        return `Created ${event.payload?.ref_type || 'activity'} in ${repoName}`;
      case 'ReleaseEvent':
        return `Released a new version in ${repoName}`;
      default:
        return `${event.type.replace(/Event$/, '')} in ${repoName}`;
    }
  }

  /**
   * Render recent GitHub events into the widget list
   */
  function renderGitHubEvents(listElement, events) {
    listElement.innerHTML = '';

    if (!events.length) {
      listElement.innerHTML = '<li class="github-live-empty">No recent public events to show.</li>';
      return;
    }

    events.forEach((event) => {
      const repoName = event.repo?.name ? event.repo.name.split('/').pop() : 'repository';
      const item = document.createElement('li');
      item.className = 'github-live-event';

      const icon = document.createElement('span');
      icon.className = 'github-live-event-icon';
      icon.innerHTML = '<i class="bi bi-github"></i>';

      const main = document.createElement('div');
      main.className = 'github-live-event-main';

      const title = document.createElement('strong');
      title.textContent = formatGitHubEventHeadline(event, repoName);

      const detail = document.createElement('span');
      detail.textContent = `${formatRelativeTime(event.created_at)} • ${repoName}`;

      main.appendChild(title);
      main.appendChild(detail);
      item.appendChild(icon);
      item.appendChild(main);
      listElement.appendChild(item);
    });
  }

  /**
   * Format a date as relative time
   */
  function formatRelativeTime(dateInput) {
    const date = new Date(dateInput);
    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.max(1, Math.round(diffMs / (60 * 1000)));

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    }

    const diffHours = Math.round(diffMinutes / 60);

    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }

    const diffDays = Math.round(diffHours / 24);

    return `${diffDays}d ago`;
  }

  /**
   * Capitalize first letter of a word
   */
  function capitalizeFirst(value) {
    if (!value) {
      return '';
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // Event Listeners
  document.addEventListener('DOMContentLoaded', initApp);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Listen for component load events
  document.addEventListener('allComponentsLoaded', () => {
    log('All components loaded', 'success');
  });

  // Expose app config for debugging
  window.VIFDevPortfolio = {
    config: AppConfig,
    version: '2.0.0',
    setDebug: (value) => { AppConfig.debug = value; }
  };

})();
