import React from "react";

const CommonBackground: React.FC = () => {
  return (
    <>
      <style>
        {`
        @keyframes slowAurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-15px); opacity: 0.7; }
        }

        .bg-root {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          background: #000000;
        }

        /* Subtle amber aurora layer */
        .aurora {
          position: absolute;
          inset: -50%;
          background: linear-gradient(
            120deg,
            rgba(255, 215, 0, 0.12),
            rgba(251, 191, 36, 0.15),
            rgba(255, 230, 120, 0.1)
          );
          background-size: 200% 200%;
          animation: slowAurora 40s ease-in-out infinite;
          filter: blur(100px);
          mix-blend-mode: soft-light;
        }

        /* Two glowing blobs for subtle motion */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: gentleFloat 18s ease-in-out infinite;
        }

        .blob.yellow {
          top: 25%;
          left: 10%;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(253, 224, 71, 0.3), transparent 70%);
        }

        .blob.orange {
          bottom: 20%;
          right: 15%;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.25), transparent 70%);
          animation-delay: 5s;
        }

        /* Minimal dot grid (very subtle) */
        .texture {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.1;
          mix-blend-mode: overlay;
        }

        /* Vignette edges */
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 70%, rgba(0,0,0,0.6));
        }
        `}
      </style>

      <div className="bg-root">
        <div className="aurora" />
        <div className="blob yellow" />
        <div className="blob orange" />
        <div className="texture" />
        <div className="vignette" />
      </div>
    </>
  );
};

export default CommonBackground;
