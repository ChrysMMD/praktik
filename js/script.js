document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ER LOADED!");

  //POPUP REF
  const popups = document.querySelectorAll(".popup-ref");
  const triggers = document.querySelectorAll(".popup-trigger");
  const closeBtns = document.querySelectorAll(".close-btn");

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      popups[index].classList.add("show");
    });
  });

  closeBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      popups[index].classList.remove("show");
    });
  });

  window.addEventListener("click", (e) => {
    popups.forEach((popup) => {
      if (e.target === popup) {
        popup.classList.remove("show");
      }
    });
  });




  //POPUP vinduerne!
  let isMobile = window.matchMedia("(max-width: 650px)").matches;

  function setupPopups() {
    document.querySelectorAll(".openPopup").forEach((button) => {
      const popup = button.nextElementSibling;
      if (!popup || !popup.classList.contains("popup")) return;

      // Fjerner tidligere event listeners for at undgå dubletter
      button.replaceWith(button.cloneNode(true));
    });

    document.querySelectorAll(".openPopup").forEach((button) => {
      const popup = button.nextElementSibling;
      if (!popup || !popup.classList.contains("popup")) return;

      if (isMobile) {
        // 🔹 Mobil: Click åbner/lukker popup
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          closeAllPopups();
          popup.classList.toggle("hidden");
          positionPopup(button, popup);

          setTimeout(() => {
            document.addEventListener("click", closeOnClickOutside);
          }, 50);
        });
      } else {
        // 🔹 Desktop: Hover åbner/lukker popup
        button.addEventListener("mouseenter", () => {
          closeAllPopups();
          popup.classList.remove("hidden");
          positionPopup(button, popup);
        });

        let closeTimeout;

        popup.addEventListener("mouseleave", (event) => {
          if (!button.contains(event.relatedTarget)) {
            closeTimeout = setTimeout(() => {
              popup.classList.add("hidden");
            }, 200);
          }
        });

        button.addEventListener("mouseleave", (event) => {
          if (!popup.contains(event.relatedTarget)) {
            closeTimeout = setTimeout(() => {
              popup.classList.add("hidden");
            }, 200);
          }
        });

        popup.addEventListener("mouseenter", () => {
          clearTimeout(closeTimeout);
        });
      }

      function closeOnClickOutside(event) {
        if (!popup.contains(event.target) && !button.contains(event.target)) {
          popup.classList.add("hidden");
          document.removeEventListener("click", closeOnClickOutside);
        }
      }
    });
  }

  function closeAllPopups() {
    document.querySelectorAll(".popup").forEach((p) => p.classList.add("hidden"));
  }

  function positionPopup(button, popup) {
    const rect = button.getBoundingClientRect();
    popup.style.position = "fixed";
    popup.style.left = `${rect.left}px`;
    popup.style.top = `${rect.bottom + 5}px`;
  }

  // 🖥️ Lyt efter skærmstørrelse-ændringer og opdater isMobile
  const mediaQuery = window.matchMedia("(max-width: 650px)");
  mediaQuery.addEventListener("change", (e) => {
    isMobile = e.matches;
    console.log("Skærmstørrelse ændret! isMobile:", isMobile);
    setupPopups(); // Genindlæs event listeners
  });

  setupPopups(); // Kør første gang



  //Mine toggle-arrows
  document.querySelectorAll(".toggle-h2").forEach((h2) => {
    h2.addEventListener("click", () => {
      h2.classList.toggle("active"); // Tilføjer/fjerner .active for rotation

      let content = h2.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });


  // --- CARDS --- //
  const projectsCards = {
    projekt1: {
      title: "UX/UI Projekt",
      img: "img/ux.webp",
      description: "Her har vi et projekt!"
    },
    projekt2: {
      title: "Projekt 2",
      img: "projekt2.jpg",
      description: "Her har vi Projekt 2. Det er endnu federe!"
    }
  };

  // --- SLIDER ---
  // Tjek om vi er på project.html ved at se om "project-title" findes
  if (document.getElementById("project-title")) {
    console.log("Er på project.html – loader projekter...");

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");

    const projects = {
      projekt1: {
        title: "UX/UI Projekt",
        images: ["img/ux.webp", "img/moodboard.webp", "img/styletile.png"],
        description: `
        <div class="description-item"><h2>Opgaven:</h2>
<p>Som studiegruppe skulle vi lave en webside til UX/UI Copenhagen Conference. Der skulle selvfølgelig lægges vægt på ux/ui men også bæredygtighed indenfor branchen, fordi det var hvad årets konference havde som tema. Et andet krav var også, at der skulle være et program for de forskellige speakers til konferencen samt et onlinesalg af billetter.</p>
</div>

<div class="description-item">
<h2>Rolle:</h2>
<p>Jeg blev givet rollen som Projektleder, da min studiegruppe vidste, at jeg havde et godt overblik, var struktureret og altid argumenterede teoretisk i stedet for emotionelt eller fordi noget “var pænt”.</p>
</div>

<div class="description-item">
<h2>Forløb:</h2>
<p>Vi startede med at lave en brainstorm, hvor vi delte projektet op i; design, kodning, ux/ui og research. Bagefter sorterede vi ideerne, og snakkede om hvilken vi ville gå videre med. 
Vi delte os op, så vi kunne dække flere opgaver med informationssøgning, research, wireframes og moodboards. Ved deadline gennemgik vi de forskellige opgaver, sparrede, ændrede og udvalgte, indtil vi havde et færdig design, layout og informationer - alle baseret på teoretiske argumenter. 
Derefter gik vi igang med styleboard og tekstskrivning. Det tog ikke lang tid, så vi begyndte at kode bagefter, hvor vi tog hver en side. 
Vi formåede ikke at blive helt færdig med vores side, men vi opfyldte de formål vi havde sat for projektet og vi positiv feedback fra kunden.</p>
</div>`
      },
      projekt2: {
        title: "Brand Strategy Projekt",
        images: ["img/ca.png", "/img/ca_grafik.png", "img/ca_styleboard.png", "img/cadokument.png"],
        description: `<div class="description-item">
<h2>Opgaven:</h2>
<p>I studiegruppen skulle vi lave et stort projekt for CA-akasse, som ønskede at vi lavede en kampagne for dem med en ung målgruppe af studerende. Vi skulle ind over SoMe, branding, kampagneplanlægning og hjemmeside. </p></div>

<div class="description-item">
<h2>Min rolle:</h2>
<p>Jeg blev udvalgt af min gruppe som projektleder udfra vores Persontype-test, vi havde skulle lave i undervisningen før projektet. <br> Min var:
<em>Chrystal - ESTJ:
Ekstrovert - Sansende - Tænkende - Vurderende </em>
Derudover følte min gruppe, de kunne arbejde godt og trygt, når der var én til at have overblikket, holde rammerne og strukturere arbejdet.</p></div>

<div class="description-item">
<h2>Forløb:</h2>
<p>Den første uge handlede kun om research og informationssøgning. Vi skulle finde ud af alt om målgruppen samt deres færden inde på social medias. Vi lavede også konkurrentanalyse, trendreseach, user research samt BMC. 
Vi opsamlede det hele i en situationsanalyse (SWOT) og lavede en kunderejse.
Derefter gik vi igang med at planlægge social media aktiviteter. Vi lavede moodboard, styletile, mockups i Figma, visuel stil og budskab og til sidst storyboard, 
Da alt dette var på plads, begyndte vi at filme video til social media. Vi tog billeder og redigerede dem. Og vi redigerede og klippede filmen til sidst. 
Til sidst kodede vi hjemmesiden sammen, lavede SEO og testede det hele af med en tænke-højt-test. </p></div>
`
      },

      projekt3: {
        title: "Semesterprojekt",
        images: ["img/figma.png", "img/semester_styletile.png", "img/semester_singleview.png", "img/semester_header.png"],
        description: `<div class="description-item">
<h2>Opgaven:</h2>
<p>I studiegruppen skulle vi som semesterafslutning finde en virksomhed, der ønskede en ny hjemmeside, SoMe Managing og en ny Brand Strategi. </p>
</div>

<div class="description-item">
<h2>Min rolle:</h2>
<p>Jeg blev udvalgt til at være gruppens Projektleder. En del af opgaven, var at vi skulle beskrive hinandens roller i grupper. Jeg blev beskrevet sådanne:
Chrys: Organisatoren. Personen med overblikket. Fokus-nørden. Den jordnære. 
Derudover havde vi lavet en del projekter sammen på daværende tidspunkt, og vi vidste hvad der fungerede, hvad vi foretrak og hvor vi var bedst. </p> </div>

<div class="description-item">
<h2>Forløb:</h2>
<p>Efter at have fundet en lille enkeltmands-virksomhed, tog vi et interview med hende, hvor vi brugte det til at opfange hendes vibe, hendes ønsker, hendes forventninger og fremtidsplaner med virksomheden. Hun var en marokansk kunstner hvis motiver var smukke, farvefulde og politiske. 
Vi lavede en masse research arbejde, brainstorming, moodboards og planlægning for at nå i mål til eksamen. Et af projektets krav var, at fokussen skulle være bæredygtighed i branchen. 
For at nå i mål delte vi opgaverne op imellem os, og mødtes efter hver sat deadline, for at planlægge den næste uge og gennem deadlines, opgaver og gruppens generelle ve og vel. 
Vi nåede at blive færdig mere eller mindre tilfredse, da det havde været svært at holde den røde tråd, eftersom vi var delt så meget op, samt gruppens forskellige, kreative perspektiver.</p>
</div>
`
      },
      projekt4: {
        title: "Logo Projekt",
        images: ["img/logo.webp"],
        description: `<div class="description-item">
<h2>Opgaven:</h2>
<p>Der skulle laves et moderne logo til en rollespilforening, som var let genkendeligt og kunne bruges til merchandise.</p>
</div>

<div class="description-item">
<h2>Min rolle:</h2>
<p>Jeg var ansvarlig for foreningens visuelle stil, og skulle derfor designe et logo, der til sidst skulle godkendes af bestyrelsen.</p>
</div>

<div class="description-item">
<h2>Forløb:</h2>
<p>Det første jeg gjorde, var at researche forskellige foreninger, logoer og ikoner, så jeg kunne sætte mig ind i hvad andre havde gjort. Jeg havde et klart billede af foreningens stil, da jeg selv havde lavet den, og vidste hvad jeg nogenlunde ville gå efter.
Efter en masse skitser begyndte jeg at sortere mine ideer. En vigtig del for mig, var at logoet kunne passe ind med både foreningensnavn og uden navnet men stadigvæk være genkendeligt. Det skulle også være kønsneutralt, moderne og simpelt. 
Jeg udviklede på min ide, indtil jeg kom op med det færdige resultat, som blev godkendt. </p></div>
`
      },
    };



    if (projects[projectId]) {
      document.getElementById("project-title").textContent = projects[projectId].title;
      document.getElementById("project-description").innerHTML = projects[projectId].description;


      const slider = document.querySelector(".slider");
      slider.innerHTML = ""; // Tøm slideren

      projects[projectId].images.forEach(imgSrc => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = projects[projectId].title;
        slider.appendChild(img);
        console.log("Billedkilder for projekt:", projects[projectId].images);

      });
      console.log("Sliderens HTML nu:", slider.innerHTML);

      // Find knapperne og tilføj event listeners
      document.querySelector(".prev").addEventListener("click", showPrevImage);
      document.querySelector(".next").addEventListener("click", showNextImage);

      let currentIndex = 0; // Starter med første billede
      const images = document.querySelectorAll(".slider img");

      function showImage(index) {
        images.forEach((img, i) => {
          img.style.display = i === index ? "block" : "none"; // Kun ét billede vises ad gangen
        });
      }

      function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length; // Looper tilbage til start
        showImage(currentIndex);
      }

      function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Looper tilbage til slut
        showImage(currentIndex);
      }

      //Sørg for at første billede vises
      showImage(currentIndex);

    } else {
      document.getElementById("project-container").innerHTML = "<h1>Projekt ikke fundet</h1><a href='index.html'>← Tilbage</a>";
    }
  } else {
    console.log("Er på index.html – ingen projekter at loade.");
  }

  //SWIPE IT!
  let touchStartX = 0;
  let touchEndX = 0;

  // Registrerer når brugeren starter swipe
  document.querySelector(".slider").addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  });

  // Registrerer når brugeren slipper og afgør swipe-retning
  document.querySelector(".slider").addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      // Swipe til venstre → næste billede
      showNextImage();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe til højre → forrige billede
      showPrevImage();
    }
  }

  // --- SWIPEY SWIPE --- //
  const swipeIndicator = document.querySelector(".swipe-indicator");
  const slider = document.querySelector(".slider");

  let hasSwiped = false;

  // Detect touch swipe
  slider.addEventListener("touchstart", () => {
    if (!hasSwiped) {
      swipeIndicator.style.display = "none"; // Skjul indikatoren
      hasSwiped = true; // Sørg for den ikke kommer igen
    }
  });
});