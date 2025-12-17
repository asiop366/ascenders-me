export default function Home() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <a href="/" className="logo">ascenders</a>
        
        <ul className="nav-links">
          <li><a href="#grades">Pricing</a></li>
          <li><a href="#preview">Preview</a></li>
          <li><a href="#features">Features</a></li>
        </ul>
        
        <div className="nav-buttons">
          <button className="btn btn-ghost">Log in</button>
          <a href="#grades" className="btn btn-primary">Join</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>Private community for high performers</h1>
        <p>
          Access exclusive guides, private discussions, and connect with 
          ambitious people. Upgrade your grade for premium content.
        </p>
        <div className="hero-buttons">
          <a href="#grades" className="btn btn-primary">View plans</a>
          <a href="https://discord.gg/YOUR-LINK" className="btn btn-secondary" target="_blank">
            Join free
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat">
          <div className="stat-value">2,847</div>
          <div className="stat-label">Members</div>
        </div>
        <div className="stat">
          <div className="stat-value">584</div>
          <div className="stat-label">Premium</div>
        </div>
        <div className="stat">
          <div className="stat-value">127</div>
          <div className="stat-label">Guides</div>
        </div>
      </section>

      {/* Grades */}
      <section className="grades-section" id="grades">
        <div className="section-header">
          <h2>Choose your plan</h2>
          <p>Unlock features based on your membership level</p>
        </div>
        
        <div className="grades-grid">
          {/* Free */}
          <div className="grade-card">
            <div className="grade-name">Free</div>
            <div className="grade-price">0€</div>
            <div className="grade-billing">Forever free</div>
            <ul className="grade-features">
              <li>General forum access</li>
              <li>Free guides</li>
              <li>Community chat</li>
              <li className="disabled">Premium channels</li>
              <li className="disabled">Private guides</li>
              <li className="disabled">Priority support</li>
            </ul>
            <a href="https://discord.gg/YOUR-LINK" className="btn btn-secondary">Join free</a>
          </div>

          {/* Standard */}
          <div className="grade-card">
            <div className="grade-name">Standard</div>
            <div className="grade-price">9€ <span>/mo</span></div>
            <div className="grade-billing">Billed monthly</div>
            <ul className="grade-features">
              <li>Everything in Free</li>
              <li>Standard badge</li>
              <li>Advanced guides</li>
              <li>Standard channels</li>
              <li className="disabled">Premium guides</li>
              <li className="disabled">Direct support</li>
            </ul>
            <a href="/api/checkout?grade=standard" className="btn btn-secondary">Get Standard</a>
          </div>

          {/* Premium */}
          <div className="grade-card popular">
            <div className="grade-badge">Most popular</div>
            <div className="grade-name">Premium</div>
            <div className="grade-price">19€ <span>/mo</span></div>
            <div className="grade-billing">Billed monthly</div>
            <ul className="grade-features">
              <li>Everything in Standard</li>
              <li>Premium badge</li>
              <li>All premium guides</li>
              <li>Premium channels</li>
              <li>Priority support</li>
              <li className="disabled">VIP access</li>
            </ul>
            <a href="/api/checkout?grade=premium" className="btn btn-primary">Get Premium</a>
          </div>

          {/* VIP */}
          <div className="grade-card">
            <div className="grade-name">VIP</div>
            <div className="grade-price">49€ <span>/mo</span></div>
            <div className="grade-billing">Billed monthly</div>
            <ul className="grade-features">
              <li>Everything in Premium</li>
              <li>Gold VIP badge</li>
              <li>All content access</li>
              <li>Private VIP channel</li>
              <li>Direct owner access</li>
              <li>Early access content</li>
            </ul>
            <a href="/api/checkout?grade=vip" className="btn btn-gold">Get VIP</a>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="preview-section" id="preview">
        <div className="section-header">
          <h2>Platform preview</h2>
          <p>See what's inside before you join</p>
        </div>
        
        <div className="preview-container">
          <div className="preview-header">
            <div className="preview-dot"></div>
            <div className="preview-dot"></div>
            <div className="preview-dot"></div>
          </div>
          
          <div className="preview-content">
            {/* Sidebar */}
            <div className="preview-sidebar">
              <div className="sidebar-header">Ascenders</div>
              
              <div className="channel-category">
                <div className="category-header">General</div>
                <div className="channel active">
                  <span className="channel-icon">#</span>
                  <span>welcome</span>
                </div>
                <div className="channel">
                  <span className="channel-icon">#</span>
                  <span>chat</span>
                </div>
                <div className="channel">
                  <span className="channel-icon">#</span>
                  <span>free-guides</span>
                </div>
              </div>
              
              <div className="channel-category">
                <div className="category-header">Premium</div>
                <div className="channel locked">
                  <span className="channel-icon">🔒</span>
                  <span>premium-guides</span>
                </div>
                <div className="channel locked">
                  <span className="channel-icon">🔒</span>
                  <span>premium-chat</span>
                </div>
              </div>
              
              <div className="channel-category">
                <div className="category-header">VIP</div>
                <div className="channel locked">
                  <span className="channel-icon">🔒</span>
                  <span>vip-lounge</span>
                </div>
              </div>
            </div>

            {/* Main */}
            <div className="preview-main">
              <div className="preview-main-header">
                <span>#</span> welcome
              </div>
              
              <div className="preview-messages">
                <div className="message">
                  <div className="message-avatar">A</div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-author">admin</span>
                      <span className="message-badge badge-owner">Owner</span>
                      <span className="message-time">Today at 2:32 PM</span>
                    </div>
                    <div className="message-text">Welcome to Ascenders. Read the rules and introduce yourself.</div>
                  </div>
                </div>
                
                <div className="message">
                  <div className="message-avatar">M</div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-author">max</span>
                      <span className="message-badge badge-premium">Premium</span>
                      <span className="message-time">Today at 2:45 PM</span>
                    </div>
                    <div className="message-text">The premium guides are worth it. Learned a lot already.</div>
                  </div>
                </div>
                
                <div className="message">
                  <div className="message-avatar">V</div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-author">victor</span>
                      <span className="message-badge badge-vip">VIP</span>
                      <span className="message-time">Today at 3:02 PM</span>
                    </div>
                    <div className="message-text">VIP channel is next level. Direct access to the team.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Members */}
            <div className="preview-members">
              <div className="members-category">
                <div className="members-category-title">Owner — 1</div>
                <div className="member">
                  <div className="member-avatar">A</div>
                  <span className="member-name owner">admin</span>
                </div>
              </div>
              
              <div className="members-category">
                <div className="members-category-title">Mod — 2</div>
                <div className="member">
                  <div className="member-avatar">M</div>
                  <span className="member-name mod">moderator</span>
                </div>
              </div>
              
              <div className="members-category">
                <div className="members-category-title">VIP — 8</div>
                <div className="member">
                  <div className="member-avatar">V</div>
                  <span className="member-name vip">victor</span>
                </div>
              </div>
              
              <div className="members-category">
                <div className="members-category-title">Premium — 42</div>
                <div className="member">
                  <div className="member-avatar">M</div>
                  <span className="member-name premium">max</span>
                </div>
              </div>
              
              <div className="members-category">
                <div className="members-category-title">Standard — 156</div>
                <div className="member">
                  <div className="member-avatar">S</div>
                  <span className="member-name standard">sam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-header">
          <h2>Why Ascenders</h2>
          <p>Built for people who want more</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Exclusive guides</h3>
            <p>Detailed guides written by experts. Updated regularly with new content.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Active community</h3>
            <p>Connect with thousands of motivated members. Share experiences and learn.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Private content</h3>
            <p>Access channels with content you won't find anywhere else.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Grade system</h3>
            <p>Unlock benefits as you upgrade. More access, more features.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Clear roadmaps</h3>
            <p>Follow step-by-step paths to reach your goals faster.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Networking</h3>
            <p>Meet people who share your ambitions and mindset.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          © 2025 Ascenders
        </div>
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
          <a href="https://discord.gg/YOUR-LINK" target="_blank">Discord</a>
        </div>
      </footer>
    </div>
  )
}
