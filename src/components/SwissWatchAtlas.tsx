'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type PlaceKey = 'geneve' | 'joux' | 'locle' | 'chaux' | 'neuchatel' | 'bienne';

type Place = {
  index: string;
  title: string;
  lead: string;
  lat: string;
  lon: string;
  identity: string;
  marker: string;
  story: string;
  signature: string;
};

const places: Record<PlaceKey, Place> = {
  geneve: {
    index: '01 · GENÈVE / GE',
    title: 'L’élégance des cabinotiers.',
    lead: 'Genève associe haute horlogerie, métiers d’art, précision et une longue tradition d’ateliers spécialisés.',
    lat: '46.2022° N',
    lon: '6.1457° E',
    identity: 'Cabinotiers',
    marker: 'Poinçon de Genève',
    story: 'La tradition genevoise a fait dialoguer mécanique, décoration et métiers d’art. Aujourd’hui encore, la ville reste un symbole majeur de l’horlogerie suisse haut de gamme.',
    signature: '« Une ville où le temps est aussi un métier. »',
  },
  joux: {
    index: '02 · VALLÉE DE JOUX / VD',
    title: 'La vallée des complications.',
    lead: 'Pour la carte, la Vallée de Joux est représentée par Le Sentier, son principal centre horloger.',
    lat: '46.6080° N',
    lon: '6.2324° E',
    identity: 'Grandes complications',
    marker: 'Le Sentier',
    story: 'Au cœur du Jura vaudois, les savoir-faire mécaniques complexes se sont développés jusqu’à devenir une signature majeure de la haute horlogerie suisse.',
    signature: '« La complexité mécanique au cœur du Jura vaudois. »',
  },
  locle: {
    index: '03 · LE LOCLE / NE',
    title: 'Une ville façonnée par l’horlogerie.',
    lead: 'Le Locle incarne une histoire de manufactures, de précision et d’organisation urbaine liée au travail horloger.',
    lat: '47.0562° N',
    lon: '6.7491° E',
    identity: 'Manufactures',
    marker: 'Patrimoine horloger',
    story: 'Ateliers, maisons et manufactures ont influencé la forme même de la ville. Ici, l’horlogerie ne se contente pas d’occuper le territoire : elle l’a façonné.',
    signature: '« Quand l’établi finit par dessiner la ville. »',
  },
  chaux: {
    index: '04 · LA CHAUX-DE-FONDS / NE',
    title: 'La ville-manufacture.',
    lead: 'Architecture, urbanisme et production horlogère se sont développés ici autour des mêmes besoins de lumière, de précision et d’atelier.',
    lat: '47.0999° N',
    lon: '6.8259° E',
    identity: 'Urbanisme horloger',
    marker: 'Patrimoine UNESCO',
    story: 'La Chaux-de-Fonds est l’un des exemples les plus marquants d’un territoire dont l’économie, l’architecture et la culture ont été structurées par la fabrication du temps.',
    signature: '« Une ville pensée pour la précision et l’atelier. »',
  },
  neuchatel: {
    index: '05 · NEUCHÂTEL / NE',
    title: 'La culture de la précision.',
    lead: 'Neuchâtel relie horlogerie, sciences de la mesure, chronométrie et innovation technique.',
    lat: '46.9918° N',
    lon: '6.9310° E',
    identity: 'Chronométrie',
    marker: 'Innovation',
    story: 'La région a joué un rôle important dans la mesure du temps, la recherche de précision et le développement des métiers horlogers.',
    signature: '« Mesurer le temps, puis apprendre à le maîtriser. »',
  },
  bienne: {
    index: '06 · BIENNE / BE',
    title: 'La force industrielle du temps.',
    lead: 'Bienne représente une autre dimension de l’horlogerie suisse : production, mouvements et maîtrise industrielle.',
    lat: '47.1371° N',
    lon: '7.2461° E',
    identity: 'Production',
    marker: 'Mouvements & industrie',
    story: 'Bienne complète l’Arc horloger par une tradition industrielle capable de conjuguer volume, technologie, précision et identité horlogère.',
    signature: '« La précision suisse à l’échelle industrielle. »',
  },
};

const cityPoints: Array<{ key: PlaceKey; label: string; x: number; y: number; tx: number; ty: number; anchor: 'start' | 'end'; leader?: [number, number] }> = [
  { key: 'geneve', label: 'GENÈVE', x: 88.37, y: 440.16, tx: 15, ty: 5, anchor: 'start' },
  { key: 'joux', label: 'VALLÉE DE JOUX', x: 98.54, y: 370.63, tx: 15, ty: 5, anchor: 'start' },
  { key: 'locle', label: 'LE LOCLE', x: 159.16, y: 293.83, tx: -28, ty: -16, anchor: 'end', leader: [-20, -11] },
  { key: 'chaux', label: 'LA CHAUX-DE-FONDS', x: 168.16, y: 286.33, tx: 23, ty: -24, anchor: 'start', leader: [17, -17] },
  { key: 'neuchatel', label: 'NEUCHÂTEL', x: 180.49, y: 304.86, tx: 19, ty: 20, anchor: 'start', leader: [14, 13] },
  { key: 'bienne', label: 'BIENNE', x: 217.46, y: 279.96, tx: 25, ty: -5, anchor: 'start', leader: [18, -4] },
];

const countryPath = 'M 598 309 L 597 307 L 592 303 L 586 303 L 584 305 L 582 309 L 582 314 L 581 315 L 578 315 L 573 310 L 570 309 L 568 312 L 570 318 L 565 321 L 561 327 L 559 328 L 553 328 L 543 324 L 533 317 L 530 316 L 527 313 L 527 305 L 526 303 L 522 302 L 516 305 L 514 305 L 512 303 L 497 295 L 494 291 L 493 288 L 493 271 L 491 266 L 486 261 L 487 257 L 494 249 L 499 239 L 499 227 L 498 225 L 490 217 L 478 210 L 473 205 L 469 197 L 462 194 L 454 194 L 445 191 L 441 191 L 434 187 L 431 187 L 427 189 L 422 194 L 418 194 L 409 190 L 410 183 L 405 179 L 401 182 L 401 185 L 400 186 L 394 186 L 393 183 L 395 182 L 396 180 L 395 175 L 386 172 L 383 168 L 379 165 L 374 165 L 366 175 L 358 179 L 355 182 L 355 185 L 357 188 L 362 191 L 366 191 L 369 189 L 374 189 L 377 192 L 378 197 L 377 198 L 363 197 L 362 202 L 355 207 L 352 207 L 351 208 L 344 207 L 334 199 L 329 199 L 326 205 L 322 209 L 312 210 L 311 211 L 300 210 L 298 207 L 293 203 L 289 204 L 284 209 L 282 209 L 280 207 L 274 206 L 271 202 L 266 202 L 257 207 L 257 215 L 256 216 L 250 216 L 247 218 L 247 225 L 243 229 L 239 231 L 228 231 L 227 230 L 224 230 L 222 229 L 216 222 L 214 221 L 204 221 L 198 213 L 195 214 L 193 217 L 193 220 L 191 221 L 188 227 L 179 234 L 179 238 L 180 240 L 182 241 L 195 240 L 198 242 L 198 246 L 188 251 L 186 255 L 186 260 L 181 262 L 179 265 L 179 268 L 175 271 L 167 280 L 163 283 L 161 283 L 158 286 L 157 296 L 152 301 L 145 305 L 140 305 L 136 302 L 132 302 L 127 306 L 124 307 L 124 316 L 128 323 L 128 325 L 124 330 L 124 334 L 128 336 L 128 339 L 126 342 L 120 347 L 108 353 L 106 353 L 96 359 L 95 361 L 95 367 L 88 375 L 88 380 L 85 382 L 85 385 L 84 386 L 85 389 L 85 399 L 81 403 L 81 406 L 85 407 L 89 413 L 87 422 L 85 425 L 80 426 L 79 427 L 79 430 L 76 432 L 74 432 L 72 434 L 72 436 L 67 439 L 66 444 L 69 447 L 77 450 L 89 449 L 94 441 L 101 439 L 105 435 L 106 428 L 104 423 L 102 421 L 102 417 L 104 412 L 108 408 L 114 405 L 132 400 L 147 393 L 165 393 L 169 395 L 171 398 L 171 403 L 167 405 L 167 409 L 172 419 L 170 432 L 169 433 L 169 436 L 166 441 L 166 445 L 173 453 L 173 458 L 172 459 L 174 461 L 179 461 L 182 459 L 186 459 L 189 465 L 189 473 L 197 482 L 197 484 L 201 492 L 205 494 L 211 494 L 219 491 L 225 491 L 226 492 L 233 491 L 239 488 L 251 477 L 255 477 L 257 480 L 259 481 L 261 480 L 267 480 L 273 486 L 273 488 L 275 489 L 286 489 L 303 478 L 308 472 L 311 466 L 312 461 L 314 459 L 317 459 L 321 457 L 322 455 L 322 447 L 325 441 L 324 439 L 318 434 L 318 432 L 325 426 L 329 424 L 338 422 L 340 419 L 341 413 L 343 409 L 353 401 L 360 400 L 361 401 L 361 407 L 365 411 L 366 416 L 363 418 L 358 424 L 358 430 L 359 432 L 373 442 L 372 449 L 376 451 L 385 451 L 396 459 L 410 458 L 412 460 L 411 464 L 402 471 L 401 473 L 405 477 L 407 482 L 409 484 L 415 486 L 419 490 L 419 494 L 414 500 L 414 503 L 419 506 L 422 506 L 423 507 L 424 506 L 430 505 L 433 502 L 436 496 L 436 487 L 434 484 L 426 479 L 426 476 L 428 475 L 432 470 L 436 454 L 442 448 L 449 443 L 458 432 L 461 425 L 460 418 L 456 412 L 458 396 L 460 393 L 467 394 L 474 389 L 479 389 L 480 392 L 476 395 L 476 401 L 477 403 L 490 417 L 500 424 L 503 425 L 507 424 L 511 420 L 511 418 L 514 415 L 524 415 L 531 410 L 539 410 L 544 414 L 545 419 L 549 421 L 549 424 L 546 429 L 547 433 L 552 436 L 563 436 L 567 434 L 567 429 L 563 424 L 561 420 L 560 414 L 558 412 L 558 409 L 563 402 L 563 398 L 562 397 L 556 397 L 553 399 L 549 399 L 547 395 L 548 383 L 549 381 L 562 369 L 568 369 L 571 372 L 572 380 L 573 381 L 580 381 L 588 386 L 595 386 L 596 385 L 597 381 L 595 378 L 595 370 L 591 364 L 585 361 L 585 359 L 588 355 L 596 338 L 596 320 L 598 314 Z';

const routePoints = '88.37,440.16 98.54,370.63 159.16,293.83 168.16,286.33 180.49,304.86 217.46,279.96';

export default function SwissWatchAtlas() {
  const [active, setActive] = useState<PlaceKey>('geneve');
  const place = places[active];

  return (
    <section className="swiss-atlas" aria-labelledby="swiss-atlas-title">
      <div className="swiss-atlas__intro">
        <div>
          <div className="swiss-atlas__kicker">Atlas HorloLearn · Arc jurassien</div>
          <h2 id="swiss-atlas-title">La Suisse <em>horlogère.</em></h2>
        </div>
        <p><strong>Une lecture du territoire par l’horlogerie.</strong><br />De Genève à Bienne, l’Arc jurassien concentre des siècles de savoir-faire, de précision, de manufactures et de grandes complications.</p>
      </div>

      <div className="swiss-atlas__main">
        <div className="swiss-atlas__map-panel">
          <div className="swiss-atlas__meta"><span>CONFŒDERATIO HELVETICA · REPÈRES GÉOGRAPHIQUES</span><b>ARC HORLOGER · GENÈVE → BIENNE</b></div>

          <svg className="swiss-atlas__map" viewBox="45 145 575 385" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Carte vectorielle de la Suisse avec villes horlogères">
            <path className="swiss-atlas__country" d={countryPath} />
            <polyline className="swiss-atlas__route-glow" points={routePoints} />
            <polyline className="swiss-atlas__route" points={routePoints} />
            {cityPoints.map((city) => (
              <g
                key={city.key}
                className={`swiss-atlas__city ${active === city.key ? 'is-active' : ''}`}
                transform={`translate(${city.x} ${city.y})`}
                role="button"
                tabIndex={0}
                onClick={() => setActive(city.key)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActive(city.key);
                  }
                }}
              >
                {city.leader ? <line className="swiss-atlas__leader" x1="0" y1="0" x2={city.leader[0]} y2={city.leader[1]} /> : null}
                <circle className="swiss-atlas__halo" r="16" />
                <circle className="swiss-atlas__ring" r="6.5" />
                <circle className="swiss-atlas__core" r="2.2" />
                <text x={city.tx} y={city.ty} textAnchor={city.anchor}>{city.label}</text>
              </g>
            ))}
          </svg>

          <div className="swiss-atlas__caption">
            <span>L’Arc jurassien</span>
            <strong>Le cœur historique de l’horlogerie suisse.</strong>
            <p>Les six repères sont positionnés à partir de leurs coordonnées géographiques.</p>
          </div>
          <div className="swiss-atlas__scale"><i />50 km</div>
          <div className="swiss-atlas__north">N</div>
        </div>

        <aside className="swiss-atlas__info" aria-live="polite">
          <div className="swiss-atlas__info-top">
            <div className="swiss-atlas__index">{place.index}</div>
            <h3>{place.title}</h3>
            <p>{place.lead}</p>
            <div className="swiss-atlas__coords"><span>LAT <b>{place.lat}</b></span><span>LON <b>{place.lon}</b></span></div>
          </div>
          <div className="swiss-atlas__facts">
            <div><span>Identité</span><strong>{place.identity}</strong></div>
            <div><span>Repère</span><strong>{place.marker}</strong></div>
          </div>
          <div className="swiss-atlas__story">
            <div><p>{place.story}</p><blockquote>{place.signature}</blockquote></div>
            <Link href="/suisse" className="swiss-atlas__explore">Explorer la Suisse horlogère</Link>
          </div>
        </aside>
      </div>

      <nav className="swiss-atlas__rail" aria-label="Territoires horlogers suisses">
        {([
          ['geneve', '01 · GE', 'Genève', 'Cabinotiers'],
          ['joux', '02 · VD', 'Vallée de Joux', 'Le Sentier'],
          ['locle', '03 · NE', 'Le Locle', 'Manufactures'],
          ['chaux', '04 · NE', 'La Chaux-de-Fonds', 'Urbanisme horloger'],
          ['neuchatel', '05 · NE', 'Neuchâtel', 'Chronométrie'],
          ['bienne', '06 · BE', 'Bienne', 'Industrie'],
        ] as Array<[PlaceKey, string, string, string]>).map(([key, code, name, desc]) => (
          <button key={key} type="button" className={active === key ? 'is-active' : ''} onClick={() => setActive(key)}>
            <small>{code}</small><strong>{name}</strong><em>{desc}</em>
          </button>
        ))}
      </nav>

      <style jsx>{`
        .swiss-atlas{max-width:80rem;margin:0 auto;padding:4.5rem 1rem;border-top:1px solid var(--hl-line);color:var(--hl-ink)}
        .swiss-atlas__intro{display:grid;grid-template-columns:1.15fr .85fr;gap:4rem;align-items:end;padding-bottom:1.8rem}
        .swiss-atlas__kicker{color:var(--hl-metal);font:10px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.23em;text-transform:uppercase;margin-bottom:.9rem}
        .swiss-atlas__intro h2{margin:0;font-family:var(--font-editorial),Georgia,serif;font-size:clamp(3rem,6vw,5.7rem);line-height:.88;letter-spacing:-.05em;font-weight:500}
        .swiss-atlas__intro h2 em{font-style:normal;color:var(--hl-metal)}
        .swiss-atlas__intro>p{max-width:35rem;margin:0 0 .2rem auto;color:var(--hl-muted);font-size:.94rem;line-height:1.75}
        .swiss-atlas__intro>p strong{color:var(--hl-ink);font-weight:500}
        .swiss-atlas__main{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(350px,.4fr);min-height:690px;border:1px solid var(--hl-line);background:var(--hl-surface)}
        .swiss-atlas__map-panel{position:relative;overflow:hidden;min-height:690px;border-right:1px solid var(--hl-line);background:radial-gradient(circle at 28% 55%,color-mix(in srgb,var(--hl-metal) 7%,transparent),transparent 29%),var(--hl-surface)}
        .swiss-atlas__map-panel:before{content:'';position:absolute;inset:0;opacity:.3;background:linear-gradient(rgba(128,128,128,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(128,128,128,.08) 1px,transparent 1px);background-size:64px 64px;pointer-events:none}
        .swiss-atlas__meta{position:absolute;z-index:4;left:1.75rem;right:1.75rem;top:1.5rem;display:flex;justify-content:space-between;gap:1.5rem;font:9px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.17em;text-transform:uppercase;color:var(--hl-muted)}
        .swiss-atlas__meta b{color:var(--hl-metal);font-weight:500}
        .swiss-atlas__map{position:absolute;left:1.6rem;right:1.6rem;top:4.1rem;bottom:2.8rem;width:calc(100% - 3.2rem);height:calc(100% - 6.9rem)}
        .swiss-atlas__country{fill:var(--hl-bg-soft);stroke:var(--hl-ink);stroke-width:1.6;vector-effect:non-scaling-stroke}
        .swiss-atlas__route-glow{fill:none;stroke:color-mix(in srgb,var(--hl-metal) 13%,transparent);stroke-width:12;stroke-linecap:round;stroke-linejoin:round}
        .swiss-atlas__route{fill:none;stroke:var(--hl-metal);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:3 7}
        .swiss-atlas__city{cursor:pointer;outline:none}
        .swiss-atlas__leader{stroke:var(--hl-metal);stroke-width:.9;opacity:.65}
        .swiss-atlas__halo{fill:color-mix(in srgb,var(--hl-metal) 18%,transparent);opacity:0;transition:.2s}
        .swiss-atlas__ring{fill:var(--hl-surface);stroke:var(--hl-metal);stroke-width:2;transition:.2s}
        .swiss-atlas__core{fill:var(--hl-metal);transition:.2s}
        .swiss-atlas__city text{fill:var(--hl-muted);font:8px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.02em;paint-order:stroke;stroke:var(--hl-surface);stroke-width:4px;stroke-linejoin:round;transition:.2s}
        .swiss-atlas__city:hover .swiss-atlas__halo,.swiss-atlas__city.is-active .swiss-atlas__halo,.swiss-atlas__city:focus .swiss-atlas__halo{opacity:1}
        .swiss-atlas__city:hover .swiss-atlas__ring,.swiss-atlas__city.is-active .swiss-atlas__ring,.swiss-atlas__city:focus .swiss-atlas__ring{fill:var(--hl-metal)}
        .swiss-atlas__city:hover .swiss-atlas__core,.swiss-atlas__city.is-active .swiss-atlas__core,.swiss-atlas__city:focus .swiss-atlas__core{fill:var(--hl-surface)}
        .swiss-atlas__city:hover text,.swiss-atlas__city.is-active text,.swiss-atlas__city:focus text{fill:var(--hl-ink)}
        .swiss-atlas__caption{position:absolute;right:7%;top:47%;max-width:255px}
        .swiss-atlas__caption span{display:block;color:var(--hl-metal);font:9px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.16em;text-transform:uppercase;margin-bottom:.5rem}
        .swiss-atlas__caption strong{display:block;font-family:var(--font-editorial),Georgia,serif;font-size:1.5rem;font-weight:500;line-height:1.08}
        .swiss-atlas__caption p{margin:.5rem 0 0;color:var(--hl-muted);font-size:.7rem;line-height:1.5}
        .swiss-atlas__scale{position:absolute;z-index:4;left:1.75rem;bottom:1.4rem;display:flex;gap:.65rem;align-items:center;color:var(--hl-muted);font:8px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.1em;text-transform:uppercase}
        .swiss-atlas__scale i{display:block;width:74px;height:1px;background:var(--hl-line-strong)}
        .swiss-atlas__north{position:absolute;z-index:4;right:1.75rem;bottom:1.25rem;color:var(--hl-muted);font:9px ui-monospace,SFMono-Regular,Menlo,monospace;text-align:center}
        .swiss-atlas__north:before{content:'';display:block;margin:0 auto .4rem;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:18px solid var(--hl-metal);width:0;height:0}
        .swiss-atlas__info{display:flex;flex-direction:column;min-height:690px;background:var(--hl-surface)}
        .swiss-atlas__info-top{padding:1.9rem;border-bottom:1px solid var(--hl-line)}
        .swiss-atlas__index{color:var(--hl-metal);font:9px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.16em;text-transform:uppercase}
        .swiss-atlas__info h3{margin:.8rem 0;font-family:var(--font-editorial),Georgia,serif;font-size:2.8rem;line-height:.95;letter-spacing:-.04em;font-weight:500}
        .swiss-atlas__info-top>p{margin:0;color:var(--hl-muted);font-size:.84rem;line-height:1.66}
        .swiss-atlas__coords{display:flex;gap:1.1rem;margin-top:1.1rem;color:var(--hl-muted);font:8px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.09em;text-transform:uppercase}
        .swiss-atlas__coords b{color:var(--hl-ink);font-weight:500}
        .swiss-atlas__facts{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--hl-line)}
        .swiss-atlas__facts>div{padding:1.2rem 1rem 1.2rem 1.9rem;border-right:1px solid var(--hl-line)}
        .swiss-atlas__facts>div:last-child{border-right:0;padding-left:1.2rem}
        .swiss-atlas__facts span{display:block;color:var(--hl-muted);font:8px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.13em;text-transform:uppercase}
        .swiss-atlas__facts strong{display:block;margin-top:.45rem;font-family:var(--font-editorial),Georgia,serif;font-size:1.12rem;line-height:1.14;font-weight:500}
        .swiss-atlas__story{padding:1.7rem 1.9rem;flex:1;display:flex;flex-direction:column;justify-content:space-between}
        .swiss-atlas__story p{margin:0;color:var(--hl-muted);font-size:.82rem;line-height:1.72}
        .swiss-atlas__story blockquote{margin:1.7rem 0 0;padding-top:1.1rem;border-top:1px solid var(--hl-line);font-family:var(--font-editorial),Georgia,serif;font-size:1.3rem;line-height:1.22}
        .swiss-atlas__explore{margin-top:1.8rem;display:inline-flex;align-items:center;gap:.9rem;width:max-content;color:var(--hl-metal);font:9px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase}
        .swiss-atlas__explore:before{content:'';display:block;width:45px;height:1px;background:var(--hl-metal)}
        .swiss-atlas__rail{display:grid;grid-template-columns:repeat(6,1fr);border:1px solid var(--hl-line);border-top:0}
        .swiss-atlas__rail button{position:relative;border:0;border-right:1px solid var(--hl-line);background:transparent;color:var(--hl-muted);padding:1rem;text-align:left;cursor:pointer}
        .swiss-atlas__rail button:last-child{border-right:0}
        .swiss-atlas__rail button:before{content:'';position:absolute;left:0;right:0;top:0;height:1px;background:transparent}
        .swiss-atlas__rail button:hover,.swiss-atlas__rail button.is-active{background:var(--hl-surface-strong);color:var(--hl-ink)}
        .swiss-atlas__rail button.is-active:before{background:var(--hl-metal)}
        .swiss-atlas__rail small{display:block;color:var(--hl-metal);font:8px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.13em;margin-bottom:.4rem}
        .swiss-atlas__rail strong{display:block;font-family:var(--font-editorial),Georgia,serif;font-size:.95rem;font-weight:500}
        .swiss-atlas__rail em{display:block;margin-top:.35rem;font-style:normal;font-size:.62rem;color:var(--hl-muted)}
        @media(max-width:1050px){.swiss-atlas__intro,.swiss-atlas__main{grid-template-columns:1fr}.swiss-atlas__intro>p{margin-left:0}.swiss-atlas__map-panel{border-right:0;border-bottom:1px solid var(--hl-line)}.swiss-atlas__info{min-height:auto}.swiss-atlas__rail{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:650px){.swiss-atlas{padding:3rem .75rem}.swiss-atlas__intro{gap:1.5rem}.swiss-atlas__map-panel{min-height:520px}.swiss-atlas__map{left:.2rem;right:.2rem;top:4.2rem;bottom:3rem;width:calc(100% - .4rem);height:calc(100% - 7.2rem)}.swiss-atlas__meta{left:.9rem;right:.9rem}.swiss-atlas__meta span{display:none}.swiss-atlas__caption{display:none}.swiss-atlas__info h3{font-size:2.4rem}.swiss-atlas__rail{grid-template-columns:repeat(2,1fr)}}
      `}</style>
    </section>
  );
}
