/* A Five Drywall — bilingual EN/ES toggle (vanilla JS, no dependencies).
   Walks visible text nodes and placeholder attributes; tags each translated
   element with data-i18n so coverage is inspectable in devtools. */
(function () {
  "use strict";

  var DICT = {
  "The Craft": "El Oficio",
  "Every Stage, Done Right": "Cada Etapa, Bien Hecha",
  "Hanging, taping, mudding, and finishing — the same careful process on every job, from a single patch to a whole house.": "Instalación, encintado, empastado y acabado — el mismo proceso cuidadoso en cada trabajo, desde un solo parche hasta una casa completa.",
  "Precise Hanging": "Instalación Precisa",
  "Panels set square and tight, every screw to spec.": "Planchas a escuadra y ajustadas, cada tornillo según especificación.",
  "Clean Taping & Mudding": "Encintado y Empastado Limpio",
  "Wide, feathered coats that stay invisible after paint.": "Capas anchas y difuminadas que quedan invisibles tras la pintura.",
  "Ceilings & Corners": "Techos y Esquinas",
  "The hard angles most crews rush — finished right.": "Los ángulos difíciles que muchos apuran — terminados bien.",
  "Process photos are illustrative stock imagery — real Alaska project photos coming soon.": "Las fotos del proceso son imágenes ilustrativas de archivo — pronto habrá fotos de proyectos reales en Alaska.",
  "On the Job": "En la Obra",
  "The Work, Up Close": "El Trabajo, de Cerca",
  "Measuring, hanging, taping, mudding, and finishing — every stage of the trade done with care.": "Medición, instalación, encintado, empastado y acabado — cada etapa del oficio hecha con cuidado.",
  "Measure Twice": "Medir Dos Veces",
  "Layout planned to minimize joints and waste.": "Distribución planificada para minimizar juntas y desperdicio.",
  "Hang It Tight": "Instalación Firme",
  "Fastened to spec so screws never pop later.": "Fijado según especificación para que los tornillos nunca salten.",
  "Straight & True": "Recto y a Plomo",
  "Checked with a straightedge before finishing starts.": "Verificado con regla antes de comenzar el acabado.",
  "Mud & Tape": "Pasta y Cinta",
  "Wide, feathered passes for invisible seams.": "Pasadas anchas y difuminadas para juntas invisibles.",
  "Ceiling Seams": "Juntas de Techo",
  "Overhead work finished as carefully as eye-level walls.": "Trabajo en altura terminado con el mismo cuidado que las paredes a la vista.",
  "Smooth Finish": "Acabado Liso",
  "Sanded and checked under work lights — paint-ready.": "Lijado y verificado bajo luces de trabajo — listo para pintar.",
  "Sheetrock Installation — Mat-Su": "Instalación de Sheetrock — Mat-Su",
  "Water Damage Repair — Wasilla & Big Lake": "Reparación por Daños de Agua — Wasilla y Big Lake",
  "Mat-Su Valley, Alaska": "Valle Mat-Su, Alaska",
  "Sheetrock Installation for New Construction — Mat-Su Valley": "Instalación de Sheetrock para Construcción Nueva — Valle Mat-Su",
  "Hang, tape, and finish for new homes, additions, and shops across Wasilla, Palmer, Big Lake, and the whole valley. Family-run crew, straight quotes. Se habla español.": "Instalación, encintado y acabado para casas nuevas, adiciones y talleres en Wasilla, Palmer, Big Lake y todo el valle. Cuadrilla familiar, presupuestos directos.",
  "From Bare Studs to Paint-Ready Walls": "De la Estructura a Paredes Listas para Pintar",
  "Built for Alaska Schedules": "Hechos para los Calendarios de Alaska",
  "For builders and owner-builders": "Para constructores y dueños-constructores",
  "Hanging — ceilings first, walls tight, screws set right": "Instalación — techos primero, paredes firmes, tornillos bien puestos",
  "Taping and mudding to Level 4 (standard) or Level 5 (smooth wall)": "Encintado y empastado a Nivel 4 (estándar) o Nivel 5 (pared lisa)",
  "Corner bead that stays straight through Alaska freeze–thaw cycles": "Esquineros que se mantienen rectos con los ciclos de congelación de Alaska",
  "Texture: orange peel, knockdown, or smooth": "Textura: cáscara de naranja, knockdown o lisa",
  "Garage and shop drywall, including fire-rated assemblies where code requires": "Drywall de garaje y taller, incluyendo tableros resistentes al fuego donde el código lo exige",
  "Board delivery coordination and stocking each room": "Coordinación de entrega de tableros y suministro por habitación",
  "Send the plans or square footage.": "Envíe los planos o los pies cuadrados.",
  "Lock the window.": "Aparte la fecha.",
  "Hang, tape, texture.": "Instalar, encintar, texturizar.",
  "Wasilla & Big Lake, Alaska": "Wasilla y Big Lake, Alaska",
  "Water & Ice-Dam Ceiling Damage Repair — Wasilla & Big Lake": "Reparación de Techos por Agua y Presas de Hielo — Wasilla y Big Lake",
  "Stained, sagging, or crumbling ceiling after a leak or an ice dam? We cut out the damage, dry-fit new board, and blend the texture so the ceiling looks like nothing ever happened.": "¿Techo manchado, colgando o desmoronándose después de una fuga o una presa de hielo? Cortamos el daño, colocamos tablero nuevo e igualamos la textura para que el techo quede como si nada hubiera pasado.",
  "Ice Dams and Leaks Are an Alaska Fact of Life": "Las Presas de Hielo y las Fugas Son Parte de la Vida en Alaska",
  "How a Ceiling Repair Goes": "Cómo Se Hace una Reparación de Techo",
  "Insurance jobs": "Trabajos de aseguranza",
  "Water-stained and sagging ceiling drywall": "Drywall de techo manchado por agua o colgando",
  "Ceilings opened up for plumbing leak repairs": "Techos abiertos por reparaciones de plomería",
  "Ice-dam damage along eave walls and ceiling edges": "Daños de presas de hielo en aleros y bordes del techo",
  "Popcorn and knockdown ceilings — matched after the patch": "Techos de palomitas y knockdown — igualados después del parche",
  "Whole-ceiling replacement when the damage is too widespread to patch": "Reemplazo completo del techo cuando el daño es demasiado extenso para parchar",
  "Photos first.": "Primero las fotos.",
  "Cut back to dry, sound board.": "Cortar hasta tablero seco y firme.",
  "New board, tape, and coats.": "Tablero nuevo, cinta y capas.",
  "Texture blend.": "Igualación de textura.",
  "Thanks — we’ll call you within one business day.": "Gracias — le llamaremos dentro de un día hábil.",
  "Need us sooner? · ¿Nos necesita antes?": "¿Nos necesita antes?",
  "Home": "Inicio",
  "Wasilla, Alaska": "Wasilla, Alaska",
  "Palmer, Alaska": "Palmer, Alaska",
  "Drywall Repair in Wasilla, AK": "Reparación de Drywall en Wasilla, AK",
  "Holes, water damage, settling cracks, and dings — repaired, textured, and blended by a family-run crew based right here in Wasilla. Se habla español.": "Agujeros, daños por agua, grietas de asentamiento y golpes — reparados, texturizados e integrados por una cuadrilla familiar con base aquí en Wasilla.",
  "Repairs That Disappear Into the Wall": "Reparaciones Que Desaparecen en la Pared",
  "A drywall patch is easy. A patch you can't find afterward is the hard part — the texture has to match, the seams have to be feathered wide, and the paint edge has to blend. That finishing work is what we do all day, so repairs come out looking like the damage never happened.": "Un parche de drywall es fácil. Lo difícil es un parche que después no se encuentra — la textura debe coincidir, las juntas deben difuminarse anchas y el borde de pintura debe integrarse. Ese trabajo de acabado es lo que hacemos todo el día.",
  "Common Wasilla-area repairs we handle:": "Reparaciones comunes que atendemos en el área de Wasilla:",
  "Water and ice-dam damage to ceilings and walls": "Daños por agua y presas de hielo en techos y paredes",
  "Settling and seasonal cracks (freeze–thaw movement is normal here — the fix has to allow for it)": "Grietas de asentamiento y de temporada (el movimiento por congelación-deshielo es normal aquí — la reparación debe tolerarlo)",
  "Doorknob holes, dents, and dings": "Agujeros de perilla, abolladuras y golpes",
  "Nail pops and screw pops": "Clavos y tornillos botados",
  "Texture matching on older orange peel and knockdown finishes": "Igualación de textura en acabados antiguos de cáscara de naranja y knockdown",
  "Patching after plumbing or electrical work": "Parches después de trabajos de plomería o electricidad",
  "Why a Local Crew Matters": "Por Qué Importa una Cuadrilla Local",
  "How it works": "Cómo funciona",
  "Send photos or call.": "Envíe fotos o llame.",
  "Straight quote.": "Presupuesto directo.",
  "Repair, texture, done.": "Reparar, texturizar, listo.",
  "Texture Matching & Drywall Texture in Palmer, AK": "Igualación de Textura y Texturizado de Drywall en Palmer, AK",
  "Texture Is Where Repairs Succeed or Fail": "En la Textura las Reparaciones Triunfan o Fracasan",
  "Palmer & the Mat-Su Valley": "Palmer y el Valle Mat-Su",
  "Orange peel — light, medium, and heavy splatter": "Cáscara de naranja — salpicado ligero, medio y pesado",
  "Knockdown — sprayed and troweled to match the existing profile": "Knockdown — rociado y llaneado para igualar el perfil existente",
  "Smooth wall / level 5 — skim-coated for critical light": "Pared lisa / nivel 5 — enlucida para luz crítica",
  "Matching aged and painted-over textures on repairs": "Igualación de texturas envejecidas y pintadas en reparaciones",
  "Re-texturing after popcorn ceiling removal": "Re-texturizado tras quitar techo de palomitas",
  "Good to know": "Bueno saber",
  "Free estimates — photos are often enough for a ballpark": "Presupuestos gratis — con fotos suele bastar para un estimado",
  "Texture needs stable heat to cure; we coordinate winter scheduling around it": "La textura necesita calor estable para curar; coordinamos la programación de invierno en torno a eso",
  "One crew handles patch, texture, and finish — no handoffs": "Una sola cuadrilla hace parche, textura y acabado — sin traspasos",
  "Drywall Repair — Wasilla": "Reparación de Drywall — Wasilla",
  "Texture Matching — Palmer": "Igualación de Textura — Palmer",
  "Services": "Servicios",
  "Our Work": "Nuestro Trabajo",
  "FAQ": "Preguntas",
  "Contact": "Contacto",
  "Drywall & Sheetrock": "Drywall y Sheetrock",
  "Free Estimates — Serving the Mat-Su Valley, Anchorage & All of Alaska.": "Presupuestos gratis — Servimos el Valle Mat-Su, Anchorage y toda Alaska.",
  "Request yours today": "Solicite el suyo hoy",
  "Call Now": "Llame Ahora",
  "Call (907) 205-6902": "Llame al (907) 205-6902",
  "Licensed": "Con Licencia",
  "Bonded": "Con Fianza",
  "Insured": "Asegurados",
  "Free Estimates": "Presupuestos Gratis",
  "Free Estimate": "Presupuesto Gratis",
  "On-Time Crews": "Cuadrillas Puntuales",
  "Licensed · Bonded · Insured": "Con licencia · Con fianza · Asegurados",
  "© 2026 A Five Drywall. All rights reserved.": "© 2026 A Five Drywall. Todos los derechos reservados.",
  "Pages": "Páginas",
  "Service Area": "Área de Servicio",
  "Wasilla & Palmer": "Wasilla y Palmer",
  "Anchorage & Eagle River": "Anchorage y Eagle River",
  "Fairbanks & Kenai": "Fairbanks y Kenai",
  "All of Alaska": "Toda Alaska",
  "Family-run drywall crews based in Wasilla, Alaska. Hanging, taping, texture, and repair — finished to a five-star standard.": "Cuadrillas familiares de paneles de yeso con base en Wasilla, Alaska. Instalación, encintado, texturizado y reparación — con un acabado de cinco estrellas.",
  "Wasilla, Alaska — Family Crews, Five-Star Finish": "Wasilla, Alaska — Cuadrillas Familiares, Acabado de Cinco Estrellas",
  "Straight walls. Clean seams.": "Paredes rectas. Juntas limpias.",
  "Five-star drywall": "Drywall de cinco estrellas",
  ", done right.": ", hecho como debe ser.",
  "From new construction hangs to flawless level 5 finishes and seamless repairs, A Five Drywall brings experienced sheetrock crews to jobs across the Mat-Su Valley, Anchorage, and all of Alaska.": "Desde instalaciones en obra nueva hasta acabados nivel 5 impecables y reparaciones invisibles, A Five Drywall lleva cuadrillas expertas en Sheetrock a proyectos en el Valle Mat-Su, Anchorage y toda Alaska.",
  "Get a Free Estimate": "Solicite un Presupuesto Gratis",
  "What We Do": "Lo Que Hacemos",
  "Complete Drywall Services": "Servicios Completos de Drywall",
  "One crew, start to finish — from the first sheet on the studs to a paint-ready wall.": "Una sola cuadrilla, de principio a fin — desde la primera plancha sobre los montantes hasta una pared lista para pintar.",
  "Sheetrock Hanging": "Instalación de Sheetrock",
  "Precise board layout, tight seams, and proper fastening on new builds, additions, garages, and remodels.": "Distribución precisa de planchas, juntas ajustadas y fijación correcta en obra nueva, ampliaciones, garajes y remodelaciones.",
  "Learn more": "Más información",
  "Taping & Mudding": "Encintado y Pasta",
  "Smooth, crack-free joints with quality compound work — level 4 standard, level 5 when your finish demands it.": "Juntas lisas y sin grietas con pasta de calidad — nivel 4 estándar, nivel 5 cuando su acabado lo exige.",
  "Texture & Matching": "Texturizado e Igualación",
  "Orange peel, knockdown, or smooth — and expert matching so patches disappear into your existing walls.": "Cáscara de naranja, knockdown o liso — e igualación experta para que los parches desaparezcan en sus paredes existentes.",
  "Drywall Repair": "Reparación de Drywall",
  "Holes, water damage, settling cracks, and dents — repaired, textured, and blended so you can't find the patch.": "Agujeros, daños por agua, grietas de asentamiento y golpes — reparados, texturizados e integrados para que no encuentre el parche.",
  "Level 5 Finishes": "Acabados Nivel 5",
  "Skim-coated, glass-smooth walls for high-gloss paint, harsh window light, and high-end interiors.": "Paredes enlucidas, lisas como el vidrio, para pinturas brillantes, luz rasante de ventanas e interiores de alta gama.",
  "New Construction & Remodels": "Obra Nueva y Remodelaciones",
  "Full-house packages for builders and homeowners — reliable schedules, clean job sites, and dust control.": "Paquetes de casa completa para constructores y propietarios — cronogramas confiables, sitios limpios y control de polvo.",
  "Repair Results": "Resultados de Reparación",
  "Drag to See the Difference": "Arrastre para Ver la Diferencia",
  "Cracks, holes, and water stains on one side — a smooth, freshly painted wall on the other. Drag the handle, or focus it and use your arrow keys, to compare.": "Grietas, agujeros y manchas de agua de un lado — una pared lisa y recién pintada del otro. Arrastre el control, o selecciónelo y use las flechas del teclado, para comparar.",
  "Before": "Antes",
  "After": "Después",
  "Illustration — real project photos coming soon.": "Ilustración — pronto fotos de proyectos reales.",
  "How It Works": "Cómo Trabajamos",
  "From Bare Studs to Paint-Ready": "De Montantes Desnudos a Listo para Pintar",
  "A clear process, communicated up front — no surprises on your schedule or your invoice.": "Un proceso claro, comunicado desde el inicio — sin sorpresas en su cronograma ni en su factura.",
  "Call or send the quote form. We look at plans or walk the job, then give you a straight price.": "Llame o envíe el formulario. Revisamos planos o visitamos la obra, y le damos un precio directo.",
  "Hang": "Instalación",
  "Boards go up square and tight, screwed to spec, with the right board for each room.": "Las planchas se instalan a escuadra y ajustadas, atornilladas según especificación, con el panel correcto para cada ambiente.",
  "Tape & Finish": "Encintado y Acabado",
  "Seams taped, coated, and sanded to the finish level your paint calls for.": "Juntas encintadas, cubiertas y lijadas al nivel de acabado que su pintura requiere.",
  "Walkthrough": "Recorrido Final",
  "We inspect under work lights with you and touch up anything that isn't five-star.": "Inspeccionamos con usted bajo luces de trabajo y retocamos todo lo que no sea de cinco estrellas.",
  "Your Free Estimate": "Su Presupuesto Gratis",
  "What to Expect on Your Free Estimate": "Qué Esperar en Su Presupuesto Gratis",
  "No pressure, no vague numbers. Here's exactly how it goes from your first call to a finished, clean job site.": "Sin presión y sin números vagos. Así es exactamente el proceso desde su primera llamada hasta una obra terminada y limpia.",
  "Walkthrough & Measure": "Recorrido y Medición",
  "We walk the job with you — or review your plans — measure the rooms, and note board type, finish level, and access.": "Recorremos la obra con usted — o revisamos sus planos — medimos los ambientes y anotamos tipo de panel, nivel de acabado y acceso.",
  "Written Quote, Same Week": "Cotización Escrita, la Misma Semana",
  "You get a written quote with a straight price and a realistic schedule, usually within the same week. No surprise line items later.": "Recibe una cotización escrita con un precio directo y un cronograma realista, normalmente en la misma semana. Sin cargos sorpresa después.",
  "Scheduled Crew": "Cuadrilla Programada",
  "We book firm dates, protect your floors and fixtures, and show up when we said we would — with the materials already lined up.": "Fijamos fechas firmes, protegemos sus pisos y muebles, y llegamos cuando dijimos — con los materiales ya coordinados.",
  "Clean Handoff": "Entrega Limpia",
  "Dust controlled, debris hauled, and a final walkthrough under work lights before we call it done.": "Polvo controlado, escombros retirados y un recorrido final bajo luces de trabajo antes de dar el trabajo por terminado.",
  "Where We Work": "Dónde Trabajamos",
  "Serving the Mat-Su Valley & Beyond": "Servimos el Valle Mat-Su y Más Allá",
  "Based in Wasilla, our crews travel throughout Southcentral Alaska — and for the right project, anywhere in the state.": "Con base en Wasilla, nuestras cuadrillas viajan por todo el centro-sur de Alaska — y para el proyecto adecuado, a cualquier parte del estado.",
  "After the Job": "Después del Trabajo",
  "Caring for New Drywall": "Cuidado del Drywall Nuevo",
  "A few habits in the first weeks keep a new finish looking five-star for years — especially through an Alaska winter.": "Unos pocos hábitos en las primeras semanas mantienen el acabado nuevo como de cinco estrellas por años — sobre todo durante el invierno de Alaska.",
  "Let the Paint Cure": "Deje Curar la Pintura",
  "Paint feels dry in hours but takes up to 30 days to fully cure. Wait before scrubbing walls or hanging heavy items, and go easy with cleaners in the first month.": "La pintura se siente seca en horas, pero tarda hasta 30 días en curar por completo. Espere antes de fregar las paredes o colgar objetos pesados, y use limpiadores con cuidado el primer mes.",
  "Watch Winter Humidity": "Vigile la Humedad en Invierno",
  "Alaska winters swing indoor air from bone-dry to damp. Keep humidity roughly between 30 and 50 percent so seams and corners stay tight through freeze-up.": "Los inviernos de Alaska llevan el aire interior de muy seco a húmedo. Mantenga la humedad entre 30 y 50 por ciento para que juntas y esquinas se conserven firmes durante las heladas.",
  "Expect a Few Nail Pops": "Espere Algunos Clavos Saltados",
  "As new framing lumber dries, a screw head or two can telegraph through — it's normal settling in the first year, not a defect, and it's a quick fix.": "Al secarse la madera nueva de la estructura, una que otra cabeza de tornillo puede marcarse — es asentamiento normal del primer año, no un defecto, y se corrige rápido.",
  "Our Touch-Up Policy": "Nuestra Política de Retoques",
  "If a seam, corner, or nail pop shows up within the first year on work we finished, call us — we'll come back and touch it up. That's the five-star standard.": "Si una junta, esquina o clavo saltado aparece durante el primer año en un trabajo que terminamos, llámenos — volvemos y lo retocamos. Ese es el estándar de cinco estrellas.",
  "Our Promise": "Nuestra Promesa",
  "The Five-Star Service Guarantee": "La Garantía de Servicio Cinco Estrellas",
  "If a seam shows, a corner cracks, or a patch telegraphs through the paint on work we finished, we come back and make it right. Straight prices, firm dates, and a finish we'll put our name on.": "Si una junta se marca, una esquina se agrieta o un parche se nota a través de la pintura en un trabajo que terminamos, volvemos y lo corregimos. Precios directos, fechas firmes y un acabado que lleva nuestro nombre.",
  "Get Your Free Estimate": "Obtenga Su Presupuesto Gratis",
  "What Clients Say": "Lo Que Dicen los Clientes",
  "Built on Word of Mouth": "Construidos por Recomendación",
  "Sample Review": "Reseña de Ejemplo",
  "Wasilla homeowner — placeholder text": "Propietario en Wasilla — texto provisional",
  "Anchorage homeowner — placeholder text": "Propietario en Anchorage — texto provisional",
  "Mat-Su Valley builder — placeholder text": "Constructor del Valle Mat-Su — texto provisional",
  "“They hung and finished our whole garage addition in the middle of winter and the seams are invisible. Showed up when they said they would, every day.”": "“Instalaron y terminaron toda la ampliación de nuestro garaje en pleno invierno y las juntas son invisibles. Llegaron cuando dijeron, todos los días.”",
  "“Had a ceiling leak patch that three other guys couldn't blend. Their texture match is perfect — you cannot tell where the repair is.”": "“Tenía un parche por filtración en el techo que otros tres no pudieron igualar. Su igualación de textura es perfecta — no se nota dónde está la reparación.”",
  "“We build three to five houses a year and this is the only drywall crew we call now. Clean level 5 work and they hit every schedule date.”": "“Construimos de tres a cinco casas al año y esta es la única cuadrilla de drywall que llamamos ahora. Trabajo nivel 5 limpio y cumplen cada fecha del cronograma.”",
  "Common Questions": "Preguntas Frecuentes",
  "Drywall FAQ": "Preguntas sobre Drywall",
  "What is a level 5 finish, and do I need one?": "¿Qué es un acabado nivel 5 y lo necesito?",
  "A level 5 finish adds a thin skim coat of joint compound over the entire wall after standard taping, producing a perfectly uniform surface. It's the right choice for glossy or dark paints, walls that get raking light from big windows, and high-end interiors. For most rooms with flat or eggshell paint, a well-done level 4 finish looks great and costs less — we'll tell you honestly which one your project needs.": "Un acabado nivel 5 agrega una capa fina de pasta sobre toda la pared después del encintado estándar, logrando una superficie perfectamente uniforme. Es la opción correcta para pinturas brillantes u oscuras, paredes con luz rasante de ventanas grandes e interiores de alta gama. Para la mayoría de los ambientes con pintura mate o cáscara de huevo, un buen nivel 4 luce excelente y cuesta menos — le diremos con honestidad cuál necesita su proyecto.",
  "Can you match my existing wall texture after a repair?": "¿Pueden igualar la textura existente de mi pared después de una reparación?",
  "Yes. Texture matching is a core specialty. We identify the original texture — orange peel, knockdown, splatter, or hand trowel — test the match on a sample area, then blend it into the surrounding wall so the repair disappears once it's painted.": "Sí. La igualación de texturas es una de nuestras especialidades. Identificamos la textura original — cáscara de naranja, knockdown, salpicado o llana — probamos la igualación en un área de muestra y la integramos a la pared para que la reparación desaparezca al pintar.",
  "When should I use moisture-resistant (green board) drywall?": "¿Cuándo debo usar panel de yeso resistente a la humedad (panel verde)?",
  "Moisture-resistant board belongs in bathrooms, laundry rooms, kitchens, and other damp areas — anywhere humidity is high but the wall isn't directly wet. For tile surrounds in showers and tubs, cement board is the correct backing instead. We'll spec the right board for every room so you're covered by code and by common sense.": "El panel resistente a la humedad va en baños, lavanderías, cocinas y otras áreas húmedas — donde la humedad es alta pero la pared no se moja directamente. Para azulejos en duchas y tinas, el respaldo correcto es panel de cemento. Especificamos el panel adecuado para cada ambiente, conforme al código y al sentido común.",
  "Do you work through the Alaska winter?": "¿Trabajan durante el invierno de Alaska?",
  "Yes — winter is prime drywall season in Alaska because interiors can be heated once the building is closed in. The key is stable temperature and humidity: joint compound needs the space held above roughly 55°F to cure properly. We coordinate with your heat source and schedule coats so cold snaps don't slow the finish.": "Sí — el invierno es temporada alta de drywall en Alaska porque los interiores pueden calentarse una vez cerrada la construcción. La clave es temperatura y humedad estables: la pasta necesita que el espacio se mantenga por encima de unos 55 °F (13 °C) para curar bien. Coordinamos con su fuente de calefacción y programamos las capas para que las olas de frío no atrasen el acabado.",
  "How long does a typical drywall job take?": "¿Cuánto tarda un trabajo típico de drywall?",
  "A single-room repair is often done in two or three short visits (coats need drying time between them). A full new-construction house typically takes one to two weeks from hang to sand, depending on size and finish level. We give you a schedule with your estimate and keep you posted at each stage.": "Una reparación de un solo ambiente suele tomar dos o tres visitas cortas (las capas necesitan tiempo de secado entre sí). Una casa de obra nueva completa normalmente toma de una a dos semanas desde la instalación hasta el lijado, según el tamaño y el nivel de acabado. Le damos un cronograma con su presupuesto y le informamos en cada etapa.",
  "Are estimates really free?": "¿Los presupuestos son realmente gratis?",
  "Yes. Call, or send the quote form with a few details and photos if you have them, and we'll get you a no-obligation price. For larger projects we'll walk the site or review plans first.": "Sí. Llame, o envíe el formulario con algunos detalles y fotos si las tiene, y le daremos un precio sin compromiso. Para proyectos grandes, primero recorremos la obra o revisamos los planos.",
  "Tell Us About Your Project": "Cuéntenos Sobre Su Proyecto",
  "Send a few details and we'll respond with a straight answer and a fair price. Prefer to talk? Call": "Envíe algunos detalles y le responderemos con una respuesta directa y un precio justo. ¿Prefiere hablar? Llame al",
  "No-pressure quotes": "Cotizaciones sin presión",
  "Fast response": "Respuesta rápida",
  "Request a Free Quote": "Solicite una Cotización Gratis",
  "Name": "Nombre",
  "Phone": "Teléfono",
  "Email": "Correo Electrónico",
  "City / Area": "Ciudad / Área",
  "Other (Alaska)": "Otra (Alaska)",
  "Project details": "Detalles del proyecto",
  "e.g., New 2,400 sq ft house — hang, tape, and texture": "p. ej., Casa nueva de 2,400 pies² — instalar, encintar y texturizar",
  "e.g., Patch and texture-match two rooms in Palmer": "p. ej., Parchar e igualar textura en dos ambientes en Palmer",
  "e.g., Level 5 finish for a living room repaint": "p. ej., Acabado nivel 5 para repintar una sala",
  "Send Quote Request": "Enviar Solicitud de Cotización",
  "Form not working? Email us directly at": "¿No funciona el formulario? Escríbanos directamente a",
  "Ready for Five-Star Walls?": "¿Listo para Paredes de Cinco Estrellas?",
  "Free estimates across the Mat-Su Valley, Anchorage, and all of Alaska. Winter or summer, we keep your project moving.": "Presupuestos gratis en el Valle Mat-Su, Anchorage y toda Alaska. En invierno o verano, mantenemos su proyecto en marcha.",
  "The Craft, Stage by Stage": "El Oficio, Etapa por Etapa",
  "Photos of finished walls all look the same — the difference is in the process. These animated scenes show how our crews take a room from bare studs to paint-ready. Project photos from real Alaska jobs are coming soon.": "Las fotos de paredes terminadas se ven todas iguales — la diferencia está en el proceso. Estas escenas animadas muestran cómo nuestras cuadrillas llevan un ambiente de montantes desnudos a listo para pintar. Pronto habrá fotos de proyectos reales en Alaska.",
  "Hanging Sheetrock": "Instalando Sheetrock",
  "Boards planned, lifted, and fastened square — the foundation of a flawless finish.": "Planchas planificadas, izadas y fijadas a escuadra — la base de un acabado impecable.",
  "Seams taped and coated in wide, feathered passes that stay invisible after paint.": "Juntas encintadas y cubiertas en pasadas anchas y difuminadas que quedan invisibles tras la pintura.",
  "Sanding Smooth": "Lijado Fino",
  "Joints sanded under work lights and checked by hand — smooth means smooth.": "Juntas lijadas bajo luces de trabajo y verificadas a mano — liso significa liso.",
  "Paint-Ready — and Painted": "Listo para Pintar — y Pintado",
  "The final test of any finish is the first coat of paint. Ours passes in raking light.": "La prueba final de todo acabado es la primera mano de pintura. El nuestro la pasa incluso con luz rasante.",
  "Want Walls Like These?": "¿Quiere Paredes Como Estas?",
  "Tell us about your project and we'll bring the same process to your job. Or call": "Cuéntenos sobre su proyecto y llevaremos el mismo proceso a su obra. O llame al",
  "Drywall Services Across Alaska": "Servicios de Drywall en Toda Alaska",
  "Every stage of the wall, handled by one experienced crew — hang, tape, texture, and finish. Here's exactly what we do and how we do it.": "Cada etapa de la pared, a cargo de una sola cuadrilla con experiencia — instalación, encintado, texturizado y acabado. Esto es exactamente lo que hacemos y cómo lo hacemos.",
  "Board goes up fast, square, and tight. We plan the layout to minimize butt joints, use the right length sheets for the room, and fasten to manufacturer spec so your finish doesn't pop screws a year later.": "Las planchas se instalan rápido, a escuadra y ajustadas. Planificamos la distribución para minimizar juntas a tope, usamos planchas del largo correcto para el ambiente y fijamos según la especificación del fabricante para que el acabado no salte tornillos un año después.",
  "New construction, additions, garages, and shops": "Obra nueva, ampliaciones, garajes y talleres",
  "Ceilings, vaults, and curved surfaces": "Techos, bóvedas y superficies curvas",
  "Standard, 5/8\" fire-rated, and sound-dampening board": "Panel estándar, resistente al fuego de 5/8\" y acústico",
  "Corner bead — square, bullnose, and off-angle": "Esquineros — cuadrados, redondeados y de ángulo especial",
  "The finish is where drywall jobs are won or lost. Our tapers run clean seams, feather wide coats, and sand under work lights so joints stay invisible after paint — not just before it.": "El acabado es donde se ganan o se pierden los trabajos de drywall. Nuestros encintadores hacen juntas limpias, difuminan capas anchas y lijan bajo luces de trabajo para que las juntas queden invisibles después de la pintura — no solo antes.",
  "Level 4 standard finish on all jobs": "Acabado estándar nivel 4 en todos los trabajos",
  "Proper drying time between coats, even in winter": "Tiempo de secado correcto entre capas, incluso en invierno",
  "Dust containment and daily cleanup": "Contención de polvo y limpieza diaria",
  "Inspection under angled light before we call it done": "Inspección con luz en ángulo antes de darlo por terminado",
  "Texture & Texture Matching": "Texturizado e Igualación de Texturas",
  "From clean orange peel to hand-troweled knockdown, we spray and finish textures that are even across the whole surface — and we match existing textures on repairs so patches vanish.": "Desde cáscara de naranja limpia hasta knockdown a llana, aplicamos y terminamos texturas uniformes en toda la superficie — e igualamos texturas existentes en reparaciones para que los parches desaparezcan.",
  "Orange peel, knockdown, splatter, and smooth": "Cáscara de naranja, knockdown, salpicado y liso",
  "Ceiling texture, including popcorn removal and retexture": "Textura de techos, incluido retiro de palomita (popcorn) y retexturizado",
  "Sample-panel test matches before we spray your wall": "Pruebas de igualación en panel de muestra antes de rociar su pared",
  "Doorknob holes, water stains, settling cracks, botched DIY patches — we cut out the damage, rebuild the surface, and blend texture and finish so you can't find the repair.": "Agujeros de perilla, manchas de agua, grietas de asentamiento, parches caseros mal hechos — cortamos el daño, reconstruimos la superficie e integramos textura y acabado para que no encuentre la reparación.",
  "Water and ice-dam damage restoration": "Restauración de daños por agua y represas de hielo",
  "Crack repair that addresses the cause, not just the symptom": "Reparación de grietas que ataca la causa, no solo el síntoma",
  "Small-job friendly — no repair is too minor to do right": "Aceptamos trabajos pequeños — ninguna reparación es demasiado menor para hacerla bien",
  "Level 5 finish": "Acabado nivel 5",
  "A full skim coat over the entire surface for glass-smooth walls. The right call for high-gloss or dark paint, big Alaska windows with raking light, and high-end interiors where nothing less will do.": "Un enlucido completo sobre toda la superficie para paredes lisas como el vidrio. La elección correcta para pintura brillante u oscura, ventanales de Alaska con luz rasante e interiores de alta gama donde nada menos es suficiente.",
  "Full-wall skim coat over a level 4 base": "Enlucido de pared completa sobre una base nivel 4",
  "Recommended for sheen paints and accent walls": "Recomendado para pinturas con brillo y paredes de acento",
  "Moisture-Resistant & Specialty Board": "Panel Resistente a la Humedad y Especializado",
  "Alaska homes fight humidity swings all year. We install moisture-resistant board in baths, laundries, and kitchens, and spec fire-rated or sound-dampening board where it belongs.": "Las casas de Alaska luchan contra cambios de humedad todo el año. Instalamos panel resistente a la humedad en baños, lavanderías y cocinas, y especificamos panel resistente al fuego o acústico donde corresponde.",
  "Moisture-resistant (green) board for damp rooms": "Panel resistente a la humedad (verde) para ambientes húmedos",
  "5/8\" Type X fire-rated board for garages and code walls": "Panel Tipo X de 5/8\" resistente al fuego para garajes y muros de código",
  "Honest guidance on where each board type is required": "Orientación honesta sobre dónde se requiere cada tipo de panel",
  "New Construction & Builder Packages": "Obra Nueva y Paquetes para Constructores",
  "Builders get one call, one crew, and a schedule they can plan around. We stock, hang, tape, texture, and leave the site broom-clean — house after house.": "Los constructores tienen una sola llamada, una sola cuadrilla y un cronograma con el que pueden planificar. Abastecemos, instalamos, encintamos, texturizamos y dejamos el sitio barrido — casa tras casa.",
  "Full-house hang-and-finish packages": "Paquetes de instalación y acabado de casa completa",
  "Coordinated scheduling with your other trades": "Programación coordinada con sus otros gremios",
  "New construction — hang & finish": "Obra nueva — instalación y acabado",
  "Not Sure What Your Job Needs?": "¿No Sabe Qué Necesita Su Proyecto?",
  "Send us photos or plans and we'll recommend the right finish level and board — no jargon, no upsell.": "Envíenos fotos o planos y le recomendaremos el nivel de acabado y el panel correctos — sin tecnicismos y sin ventas forzadas.",
  "Get a Price on Your Project": "Obtenga un Precio para Su Proyecto",
  "Let's Talk About Your Walls": "Hablemos de Sus Paredes",
  "Free, no-pressure estimates for any drywall project in Alaska — from a single patch to a whole house. Call, email, or send the form and we'll get right back to you.": "Presupuestos gratis y sin presión para cualquier proyecto de drywall en Alaska — desde un solo parche hasta una casa completa. Llame, escriba o envíe el formulario y le responderemos enseguida.",
  "Reach Us Directly": "Contáctenos Directamente",
  "Call or Text": "Llame o Envíe un Mensaje",
  "Based In": "Con Base En",
  "Wasilla, Alaska — serving Palmer, Anchorage, Eagle River, Fairbanks, Kenai, and all of Alaska.": "Wasilla, Alaska — servimos Palmer, Anchorage, Eagle River, Fairbanks, Kenai y toda Alaska.",
  "Rather Just Call?": "¿Prefiere Solo Llamar?",
  "Fastest way to a quote is a phone call — but the form works great too, especially if you can describe the job.": "La vía más rápida a una cotización es una llamada — pero el formulario también funciona muy bien, sobre todo si puede describir el trabajo.",
  "We answer questions, talk through options, and give real numbers — no pressure, no obligation.": "Respondemos preguntas, conversamos opciones y damos números reales — sin presión y sin compromiso.",
  "Start a Conversation": "Inicie una Conversación",
  "Type of work": "Tipo de trabajo",
  "Repair or patch": "Reparación o parche",
  "Texture / texture matching": "Texturizado / igualación de textura",
  "Remodel / addition": "Remodelación / ampliación",
  "Not sure — need advice": "No estoy seguro — necesito asesoría",
  "Room sizes, timeline, photos to follow by email — anything helps": "Tamaños de ambientes, plazos, fotos por correo — todo ayuda",
  "Tell us what you're building or fixing and we'll respond with a straight answer. Prefer to talk? Call": "Cuéntenos qué está construyendo o reparando y le responderemos con una respuesta directa. ¿Prefiere hablar? Llame al"
};

  var STORE_KEY = "afs-lang";
  var records = [];   // { node: TextNode, en: string, lead: string, trail: string }
  var attrRecords = []; // { el, attr, en }
  var SKIP = { SCRIPT: 1, STYLE: 1, SVG: 1, TITLE: 1, NOSCRIPT: 1 };

  function collect() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        while (p) {
          if (p.nodeName && SKIP[p.nodeName.toUpperCase()]) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return /\S/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var raw = n.nodeValue;
      var en = raw.replace(/^\s+|\s+$/g, "");
      if (DICT.hasOwnProperty(en)) {
        records.push({
          node: n,
          en: en,
          lead: raw.slice(0, raw.length - raw.replace(/^\s+/, "").length),
          trail: raw.slice(raw.replace(/\s+$/, "").length)
        });
        if (n.parentNode && n.parentNode.setAttribute) n.parentNode.setAttribute("data-i18n", "");
      }
    }
    ["placeholder"].forEach(function (attr) {
      document.querySelectorAll("[" + attr + "]").forEach(function (el) {
        var v = el.getAttribute(attr);
        if (v && DICT.hasOwnProperty(v)) {
          attrRecords.push({ el: el, attr: attr, en: v });
          el.setAttribute("data-i18n", "");
        }
      });
    });
  }

  function setLang(lang) {
    var es = lang === "es";
    records.forEach(function (r) {
      r.node.nodeValue = r.lead + (es ? DICT[r.en] : r.en) + r.trail;
    });
    attrRecords.forEach(function (r) {
      r.el.setAttribute(r.attr, es ? DICT[r.en] : r.en);
    });
    document.documentElement.setAttribute("lang", es ? "es" : "en");
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.setAttribute("aria-pressed", es ? "true" : "false");
      var enSpan = btn.querySelector(".lang-en");
      var esSpan = btn.querySelector(".lang-es");
      if (enSpan) enSpan.classList.toggle("lang-active", !es);
      if (esSpan) esSpan.classList.toggle("lang-active", es);
    });
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function initialLang() {
    var m = /[?&]lang=(es|en)\b/.exec(window.location.search);
    if (m) return m[1];
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved === "es" || saved === "en") return saved;
    } catch (e) { /* private mode */ }
    return "en";
  }

  function init() {
    collect();
    var lang = initialLang();
    if (lang !== "en") setLang(lang); else setLang("en");
    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("lang") === "es" ? "en" : "es";
        setLang(next);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
