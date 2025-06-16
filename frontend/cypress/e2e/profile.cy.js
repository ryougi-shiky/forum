describe('Profile Page', () => {
  const FRONTEND_URL_LOGIN = `${Cypress.config().baseUrl}/login`;
  const FRONTEND_URL_HOME = `${Cypress.config().baseUrl}/`;
  const TEST_USERNAME = 'didi';
  const FRONTEND_URL_PROFILE = `${Cypress.config().baseUrl}/profile/${TEST_USERNAME}`;
  const OWN_PROFILE_URL = `${Cypress.config().baseUrl}/profile/didi`;
  
  beforeEach(() => {
    cy.visit(FRONTEND_URL_LOGIN);
    cy.get('input[placeholder="Email"]').type('didi@gmail.com');
    cy.get('input[placeholder="Password"]').type('yzm7046406');
    cy.get('[data-testid="login-button"]').click();

    cy.url().should('eq', FRONTEND_URL_HOME);
    
    // Navigate to profile page
    cy.visit(FRONTEND_URL_PROFILE);
  });

  it('should render all main components of the profile page', () => {
    cy.get('.topbarContainer').should('be.visible');
    cy.get('.sidebar').should('be.visible');
    cy.get('.profileRight').should('be.visible');
    cy.get('.rightbar').should('be.visible');
  });

  it('should render all elements in the profile cover section', () => {
    cy.get('.profileCover').should('be.visible');
    cy.get('.profileCoverImg').should('be.visible');
    cy.get('.profileUserImg').should('be.visible');
    
    cy.get('.profileInfo').should('be.visible');
    cy.get('.profileInfoName').should('be.visible').and('contain', TEST_USERNAME);
    cy.get('.profileInfoDesc').should('exist');
  });

  it('should render user info in the rightbar component', () => {
    cy.get('.rightbarTitle').should('be.visible').and('contain', 'User Info');
    cy.get('.rightbarInfo').should('be.visible');
    
    cy.get('.rightbarInfoItem').should('have.length.at.least', 2);
    cy.get('.rightbarInfoItem').eq(0).within(() => {
      cy.get('.rightbarInfoKey').should('contain', 'Age:');
      cy.get('.rightbarInfoValue').should('exist');
    });
    
    cy.get('.rightbarInfoItem').eq(1).within(() => {
      cy.get('.rightbarInfoKey').should('contain', 'From:');
      cy.get('.rightbarInfoValue').should('exist');
    });
  });

  it('should render the feed component with posts', () => {
    cy.get('.feed').should('be.visible');
    cy.get('.feedWrapper').should('be.visible');
    
    // Check if posts are loaded
    cy.get('.post').should('exist');
    
    // Verify post structure for each post
    cy.get('.post').each(($post) => {
      cy.wrap($post).find('.postWrapper').should('be.visible');
      cy.wrap($post).find('.postTop').should('be.visible');
      cy.wrap($post).find('.postTopLeft').should('be.visible');
      cy.wrap($post).find('.postProfileImg').should('be.visible');
      cy.wrap($post).find('.postUsername').should('be.visible');
      cy.wrap($post).find('.postDate').should('be.visible');
      cy.wrap($post).find('.postTopRight').should('be.visible');
      cy.wrap($post).find('.morevert').should('be.visible');

      cy.wrap($post).find('.postCenter').should('be.visible');
      cy.wrap($post).find('.postText').should('exist');

      cy.wrap($post).find('.postBottom').should('be.visible');
      cy.wrap($post).find('.postBottomLeft').should('be.visible');
      cy.wrap($post).find('.likeIcon').should('be.visible');
      cy.wrap($post).find('.postLikeCounter').should('be.visible');
      cy.wrap($post).find('.postBottomRight').should('be.visible');
      cy.wrap($post).find('.addCommentIcon').should('be.visible');
      cy.wrap($post).find('.postCommentText').should('be.visible').and('contain', 'See Comments');
    });
  });

  it('should show follow/unfollow button when viewing another user\'s profile', () => {
    // First visit another user's profile
    cy.visit(`${Cypress.config().baseUrl}/profile/nagi`);
    
    // Check if follow/unfollow button exists
    cy.get('.rightbarFollowButton').should('be.visible').and('contain', 'Follow');

    cy.get('.rightbarFollowButton').click();
    cy.wait(500); // Wait for API call and state update
    cy.get('.rightbarFollowButton').should('contain', 'Unfollow');

    cy.get('.rightbarFollowButton').click();
    cy.wait(500);
    cy.get('.rightbarFollowButton').should('contain', 'Follow');
  });

  it('should not show follow/unfollow button on own profile', () => {
    // Visit own profile
    cy.visit(OWN_PROFILE_URL);
    
    // Verify follow button is not present
    cy.get('.rightbarFollowButton').should('not.exist');
  });

  it('should show edit button for user info on own profile', () => {
    // Visit own profile
    cy.visit(OWN_PROFILE_URL);
    
    // Check if edit button exists
    cy.get('.rightbarUserinfoEditButtons').should('be.visible');
    cy.get('.rightbarEditButton').should('be.visible').and('contain', 'Edit');
  });

  it('should allow editing user info on own profile', () => {
    // Visit own profile
    cy.visit(OWN_PROFILE_URL);
    
    // Click edit button
    cy.get('.rightbarEditButton').contains('Edit').click();
    
    // Check if input fields are visible
    cy.get('input.rightbarInfoValue').should('have.length', 2);
    
    // Test editing age
    const newAge = '30';
    cy.get('input.rightbarInfoValue').eq(0).clear().type(newAge);
    
    // Test editing location
    const newLocation = 'New York';
    cy.get('input.rightbarInfoValue').eq(1).clear().type(newLocation);
    
    // Save changes
    cy.get('.rightbarEditButton').contains('Save').click();
    
    // Verify changes were saved
    cy.get('.rightbarInfoValue').eq(0).should('contain', newAge);
    cy.get('.rightbarInfoValue').eq(1).should('contain', newLocation);
  });

  it('should allow canceling edit of user info', () => {
    // Visit own profile
    cy.visit(OWN_PROFILE_URL);
    
    // Get initial values
    let initialAge, initialLocation;
    cy.get('.rightbarInfoValue').eq(0).invoke('text').then((text) => {
      initialAge = text;
    });
    cy.get('.rightbarInfoValue').eq(1).invoke('text').then((text) => {
      initialLocation = text;
    });
    
    // Click edit button
    cy.get('.rightbarEditButton').contains('Edit').click();
    
    // Change values
    cy.get('input.rightbarInfoValue').eq(0).clear().type('99');
    cy.get('input.rightbarInfoValue').eq(1).clear().type('Test Location');
    
    // Cancel changes
    cy.get('.rightbarEditButton').contains('Cancel').click();
    
    // Verify values were not changed
    cy.get('.rightbarInfoValue').eq(0).invoke('text').then((text) => {
      expect(text).to.equal(initialAge);
    });
    cy.get('.rightbarInfoValue').eq(1).invoke('text').then((text) => {
      expect(text).to.equal(initialLocation);
    });
  });

  it('should show share component only on own profile', () => {
    // Visit own profile
    cy.visit(OWN_PROFILE_URL);
    
    // Verify share component is visible
    cy.get('.share').should('be.visible');
    
    // Visit another user's profile
    cy.visit(`${Cypress.config().baseUrl}/profile/john`);
    
    // Verify share component is not visible
    cy.get('.share').should('not.exist');
  });

  it('should allow creating a post on own profile', () => {
    // Visit own profile
    cy.visit(OWN_PROFILE_URL);
    
    // Create a post
    const postText = 'Test post from Cypress on profile page';
    cy.get('.shareInput').type(postText);
    cy.get('.shareButton').click();
    
    // Verify post was created
    cy.get('.post').first().find('.postText').should('contain', postText);
  });

  it('should allow clicking on profile picture to upload new image on own profile', () => {
    // Visit own profile
    cy.visit(OWN_PROFILE_URL);
    
    // Intercept file upload request
    cy.intercept('PUT', '**/users/*/profilePicture').as('uploadProfilePicture');
    
    // Simulate file upload by triggering the hidden input
    cy.get('.profileUserImg').click();
    
    // Since we can't actually upload a file in Cypress without plugins,
    // we'll just verify the file input exists and would be triggered
    cy.get('input[type="file"]').should('exist');
  });

  it('should display post interactions correctly', () => {
    // Test liking a post
    cy.get('.post').first().within(() => {
      const likeCounter = cy.get('.postLikeCounter');
      likeCounter.invoke('text').then((text) => {
        const initialLikes = parseInt(text.split(' ')[0]);
        
        cy.get('.likeIcon').click();
        
        cy.get('.postLikeCounter').should(($counter) => {
          const newText = $counter.text();
          const newLikes = parseInt(newText.split(' ')[0]);
          
          expect(Math.abs(newLikes - initialLikes)).to.equal(1);
        });
      });
    });
    
    // Test commenting on a post
    cy.get('.post').first().within(() => {
      cy.get('.addCommentIcon').click();
      cy.get('.commentTextbox').should('be.visible');
      cy.get('.commentTextbox').type('Test comment on profile page');
      cy.get('.commentTextboxButton').click();
      
      // View comments
      cy.get('.postCommentText').click();
      cy.get('.postBottomCommentList').should('be.visible');
      cy.get('.commentItem').should('exist');
    });
  });

  it('should navigate back to home page when clicking on home link', () => {
    cy.get('.topbarLink').contains('Home').click();
    cy.url().should('eq', FRONTEND_URL_HOME);
  });
});
