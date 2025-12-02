        <!-- Navigation -->
        <nav class="navbar">
            <div class="container">
                <a href="<?php echo isset($base_path) ? $base_path : ''; ?>index.php" class="logo">Pipelai</a>
                <div class="nav-right">
                    <button class="menu-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Side Navigation -->
        <div id="sideNav" class="side-nav">
            <div class="side-nav-header">
                <div class="brand-section">
                    <h3>Pipelai</h3>
                </div>
                <button class="close-nav">&times;</button>
            </div>
            <div class="side-nav-content">
                <a href="<?php echo isset($base_path) ? $base_path : ''; ?>index.php" class="nav-item">Home</a>
                <a href="<?php echo isset($base_path) ? $base_path : ''; ?>services.php" class="nav-item">Services</a>
                <a href="<?php echo isset($base_path) ? $base_path : ''; ?>privacy-policy.php" class="nav-item">Privacy Policy</a>
                <a href="<?php echo isset($base_path) ? $base_path : ''; ?>terms-of-service.php" class="nav-item">Terms of Service</a>
            </div>
        </div>
        
        <!-- Overlay -->
        <div id="navOverlay" class="nav-overlay"></div>
