# DETECTIVE DOSSIER — PURE PYTHON AUTONOMOUS GENERATOR FOR GOOGLE COLAB
import os, sys, math, time, json, subprocess
from PIL import Image, ImageDraw, ImageFont

def generate_case_video(case_id=101, output_mp4="/content/Detective_Case_101.mp4"):
    print(f"🎬 [Detective Colab] Generating Case #{case_id} on Colab GPU...")
    os.makedirs("/content/assets", exist_ok=True)
    
    # 1. Download photorealistic assets
    base_url = "https://raw.githubusercontent.com/Dali-Math/horlo-afp/main/public/detective"
    for fname in ["crime_scene_101.jpg", "suspect_a.jpg", "suspect_b.jpg", "suspect_c.jpg"]:
        fpath = f"/content/assets/{fname}"
        if not os.path.exists(fpath):
            subprocess.run(["wget", "-q", "-O", fpath, f"{base_url}/{fname}"])
            
    scene_img = Image.open("/content/assets/crime_scene_101.jpg").convert("RGB")
    susp_a_img = Image.open("/content/assets/suspect_a.jpg").convert("RGB")
    susp_b_img = Image.open("/content/assets/suspect_b.jpg").convert("RGB")
    susp_c_img = Image.open("/content/assets/suspect_c.jpg").convert("RGB")
    
    # 2. Voiceover scripts
    script1 = "Police Dossier, Case one zero one. At ten PM, billionaire Arthur Vance was found dead in his mountain cabin. Snow has been falling non-stop since six PM. Three suspects have an alibi: Suspect A, his wife, claims she just arrived ten minutes ago in her car. Suspect B, his partner, claims he was asleep upstairs all evening. Suspect C, the caretaker, claims he was salting the walkway when he heard the scream. Look closely at the crime scene. One of them made a fatal mistake. Who is the killer? You have seven seconds!"
    script2 = "Look at the wife's car outside! If she drove here ten minutes ago, the warm engine would have melted the snow on the hood. The thick ice proves the car was parked cold for hours. Suspect A is the killer! Did you solve it? Comment your deduction below!"
    
    # Generate audio via edge-tts
    subprocess.run(["edge-tts", "--voice", "en-US-BrianNeural", "--rate=+4%", "--pitch=-2Hz", "--text", script1, "--write-media", "/content/v1.mp3", "--write-subtitles", "/content/v1.vtt"])
    subprocess.run(["edge-tts", "--voice", "en-US-BrianNeural", "--rate=+4%", "--pitch=-2Hz", "--text", script2, "--write-media", "/content/v2.mp3", "--write-subtitles", "/content/v2.vtt"])
    
    def get_dur(f):
        res = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", f], capture_output=True, text=True)
        return float(res.stdout.strip() or "15.0")
        
    dur1 = get_dur("/content/v1.mp3")
    dur2 = get_dur("/content/v2.mp3")
    
    countdown_start = dur1 + 0.4
    countdown_dur = 7.0
    reveal_start = countdown_start + countdown_dur
    total_dur = math.ceil(reveal_start + dur2 + 1.2)
    fps = 30
    total_frames = int(total_dur * fps)
    
    # Generate noir soundscape WAV (sub drone + 7s heartbeat & ticking + reveal stinger)
    sample_rate = 44100
    num_samples = int(sample_rate * total_dur)
    import struct
    wav_bytes = bytearray(44 + num_samples * 4)
    struct.pack_into("<4sI4s4sIHHIIHH4sI", wav_bytes, 0, b"RIFF", 36 + num_samples * 4, b"WAVE", b"fmt ", 16, 1, 2, sample_rate, sample_rate * 4, 4, 16, b"data", num_samples * 4)
    
    for i in range(num_samples):
        t = i / sample_rate
        sub = (math.sin(2 * math.pi * 40 * t) + math.sin(2 * math.pi * 43.5 * t)) * 0.08
        hb = 0
        if countdown_start <= t <= reveal_start:
            phase = ((t - countdown_start) * 1.35) % 1.0
            lub = math.exp(-phase * 18.0) * math.sin(2 * math.pi * 65 * t) * 0.22
            dub = math.exp(-(phase - 0.28) * 22.0) * math.sin(2 * math.pi * 55 * t) * 0.16 if phase > 0.28 else 0
            tick_p = (t - countdown_start) % 1.0
            tick = math.sin(2 * math.pi * 2400 * t) * math.exp(-tick_p * 80) * 0.12 if tick_p < 0.06 else 0
            hb = lub + dub + tick
        stinger = 0
        if reveal_start <= t < reveal_start + 3.0:
            dt = t - reveal_start
            stinger = (math.sin(2 * math.pi * 220 * dt) + math.sin(2 * math.pi * 277.18 * dt) + math.sin(2 * math.pi * 329.63 * dt)) * math.exp(-dt * 1.5) * 0.25
        val = max(-0.95, min(0.95, sub + hb + stinger))
        s = int(val * 32767)
        struct.pack_into("<hh", wav_bytes, 44 + i * 4, s, s)
        
    with open("/content/pulse.wav", "wb") as f:
        f.write(wav_bytes)
        
    # Combine voice & soundscape with FFmpeg
    subprocess.run([
        "ffmpeg", "-y", "-i", "/content/v1.mp3", "-i", "/content/v2.mp3", "-i", "/content/pulse.wav",
        "-filter_complex",
        f"[1:a]adelay={int((countdown_start + countdown_dur)*1000)}|{int((countdown_start + countdown_dur)*1000)}[a2];"
        f"[0:a][a2]amix=inputs=2:duration=longest:dropout_transition=0[va];"
        f"[va]volume=1.28,apad=whole_dur={total_dur}[va2];[2:a]volume=0.45[bg];"
        f"[va2][bg]amix=inputs=2:duration=longest:dropout_transition=0[aout]",
        "-map", "[aout]", "-t", str(total_dur), "/content/final_audio.wav"
    ], check=True)
    
    print(f"🎵 Audio ready ({total_dur}s). Starting 30 FPS video rendering pipe...")
    
    # FFmpeg video encoding pipe
    ffmpeg_cmd = [
        "ffmpeg", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", "1080x1920", "-r", "30",
        "-i", "-", "-i", "/content/final_audio.wav",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-shortest", output_mp4
    ]
    pipe = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    
    # Load fonts
    try:
        f_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 32)
        f_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
        f_badge = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
        f_big = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 84)
        f_card_t = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 28)
        f_card_d = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 23)
    except:
        f_title = f_sub = f_badge = f_big = f_card_t = f_card_d = ImageFont.load_default()

    # Pre-crop thumbnail images for suspects (130x130)
    def prep_susp(img):
        w, h = img.size
        side = min(w, h)
        return img.crop(((w-side)//2, (h-side)//2, (w+side)//2, (h+side)//2)).resize((130, 130), Image.Resampling.LANCZOS)
        
    thumb_a = prep_susp(susp_a_img)
    thumb_b = prep_susp(susp_b_img)
    thumb_c = prep_susp(susp_c_img)
    
    iw, ih = scene_img.size
    sc_w, sc_h = 1000, 700
    sc_x, sc_y = 40, 175
    
    for f in range(total_frames):
        t = f / fps
        im = Image.new("RGB", (1080, 1920), (5, 8, 16))
        draw = ImageDraw.Draw(im)
        
        # Header
        draw.rounded_rectangle([40, 55, 1040, 155], radius=20, fill=(15, 23, 42), outline=(239, 68, 68), width=3)
        draw.rounded_rectangle([65, 80, 215, 128], radius=8, fill=(220, 38, 38))
        draw.text((140, 104), "CRIME FILE", fill=(255, 255, 255), font=f_badge, anchor="mm")
        draw.text((250, 99), f"CASE #{case_id} • THE SNOWY LODGE ALIBI", fill=(248, 250, 252), font=f_title)
        draw.text((250, 131), "ASPEN, COLORADO • VICTIM: ARTHUR VANCE", fill=(148, 163, 184), font=f_sub)
        
        # Camera zoom & pan on Crime Scene
        c_prog = 1.0 if t >= reveal_start else (max(0, (t - countdown_start) / countdown_dur) * 0.45 if t >= countdown_start else 0.0)
        target_sx, target_sy, target_sw, target_sh = 180, 280, 560, 380
        cur_sx = int(0 + c_prog * target_sx)
        cur_sy = int(0 + c_prog * target_sy)
        cur_sw = int(iw - c_prog * (iw - target_sw))
        cur_sh = int(ih - c_prog * (ih - target_sh))
        
        scene_crop = scene_img.crop((cur_sx, cur_sy, cur_sx + cur_sw, cur_sy + cur_sh)).resize((sc_w, sc_h), Image.Resampling.BILINEAR)
        im.paste(scene_crop, (sc_x, sc_y))
        
        border_col = (253, 224, 71) if t >= reveal_start else (51, 65, 85)
        draw.rounded_rectangle([sc_x, sc_y, sc_x + sc_w, sc_y + sc_h], radius=24, outline=border_col, width=4)
        
        # Detective crosshair on frozen hood in reveal
        if t >= reveal_start:
            lx = int(sc_x + sc_w * 0.54)
            ly = int(sc_y + sc_h * 0.52)
            draw.ellipse([lx-115, ly-115, lx+115, ly+115], outline=(239, 68, 68), width=8)
            draw.line([(lx-135, ly), (lx+135, ly)], fill=(255, 255, 255), width=3)
            draw.line([(lx, ly-135), (lx, ly+135)], fill=(255, 255, 255), width=3)
            draw.rounded_rectangle([lx-220, ly-185, lx+220, ly-130], radius=14, fill=(220, 38, 38))
            draw.text((lx, ly-157), "CRITICAL EVIDENCE: COLD FROZEN HOOD", fill=(255, 255, 255), font=f_badge, anchor="mm")
            
        # Suspects or Countdown or Reveal
        if t < countdown_start:
            suspects = [
                ("A", "THE WIFE : Victoria Vance", '"Claims she just drove up from the city 10 minutes ago in her car."', thumb_a, (239, 68, 68)),
                ("B", "THE PARTNER : Marcus Croft", '"Claims he was asleep in the guest room upstairs all evening."', thumb_b, (56, 189, 248)),
                ("C", "THE CARETAKER : Thomas Reed", '"Claims he was salting the walkway when he heard the scream."', thumb_c, (245, 158, 11))
            ]
            for s_idx, (letter, role, alibi, th, col) in enumerate(suspects):
                y_pos = 895 + s_idx * 175
                draw.rounded_rectangle([40, y_pos, 1040, y_pos + 160], radius=20, fill=(15, 23, 42), outline=col, width=3)
                im.paste(th, (58, y_pos + 15))
                draw.rounded_rectangle([58, y_pos + 15, 188, y_pos + 145], radius=14, outline=col, width=3)
                draw.rounded_rectangle([53, y_pos + 10, 91, y_pos + 48], radius=10, fill=col)
                draw.text((72, y_pos + 29), letter, fill=(5, 7, 14), font=f_badge, anchor="mm")
                draw.text((215, y_pos + 38), role, fill=(255, 255, 255), font=f_card_t)
                draw.text((215, y_pos + 85), alibi, fill=(203, 213, 225), font=f_card_d)
        elif t < reveal_start:
            rem = max(1, math.ceil(reveal_start - t))
            draw.rounded_rectangle([40, 895, 1040, 1425], radius=26, fill=(15, 23, 42), outline=(239, 68, 68), width=3)
            draw.text((540, 965), "WHO IS THE KILLER? SPOT THE FATAL LIE!", fill=(239, 68, 68), font=f_title, anchor="mm")
            draw.ellipse([440, 1015, 640, 1215], outline=(239, 68, 68), width=14)
            draw.text((540, 1115), str(rem), fill=(255, 255, 255), font=f_big, anchor="mm")
            draw.text((540, 1295), "Look closely at the snow outside the lodge...", fill=(253, 224, 71), font=f_card_t, anchor="mm")
            draw.text((540, 1345), "Comment: A, B, or C before time runs out!", fill=(148, 163, 184), font=f_sub, anchor="mm")
        else:
            draw.rounded_rectangle([40, 895, 1040, 1425], radius=26, fill=(15, 23, 42), outline=(253, 224, 71), width=4)
            draw.rounded_rectangle([280, 925, 800, 985], radius=30, fill=(220, 38, 38))
            draw.text((540, 955), "KILLER IDENTIFIED: SUSPECT A (THE WIFE)", fill=(255, 255, 255), font=f_badge, anchor="mm")
            draw.rounded_rectangle([75, 1015, 1005, 1290], radius=20, fill=(30, 41, 59), outline=(56, 189, 248), width=2)
            draw.text((105, 1045), "THE DEDUCTION PROOF (THE FROZEN HOOD):", fill=(56, 189, 248), font=f_badge)
            proof_text = "Look at her car outside! If she had driven here 10 minutes ago, the warm engine would have melted the snow on the hood. The thick blanket of snow proves the car has been parked cold for hours!"
            draw.text((105, 1100), proof_text[:55], fill=(248, 250, 252), font=f_card_t)
            draw.text((105, 1145), proof_text[55:110], fill=(248, 250, 252), font=f_card_t)
            draw.text((105, 1190), proof_text[110:], fill=(248, 250, 252), font=f_card_t)
            draw.text((540, 1370), "DID YOU CATCH IT? COMMENT YOUR SCORE!", fill=(253, 224, 71), font=f_title, anchor="mm")
            
        # Captions
        draw.rounded_rectangle([50, 1455, 1030, 1685], radius=26, fill=(5, 7, 14), outline=(253, 224, 71), width=3)
        draw.text((540, 1570), "CRIME SCENE DEDUCTION", fill=(253, 224, 71), font=f_title, anchor="mm")
        
        # Footer
        draw.text((540, 1785), "CRIME SCENE DEDUCTION • SUBSCRIBE FOR DAILY CASES", fill=(100, 116, 139), font=f_sub, anchor="mm")
        draw.rounded_rectangle([60, 1825, 1020, 1841], radius=8, fill=(255, 255, 255, 30))
        draw.rounded_rectangle([60, 1825, 60 + int(960 * (t / total_dur)), 1841], radius=8, fill=(239, 68, 68))
        
        pipe.stdin.write(im.tobytes())
        if f % 150 == 0:
            print(f"Frame {f}/{total_frames} ({int(f/total_frames*100)}%)")
            
    pipe.stdin.close()
    pipe.wait()
    print(f"✅ [Detective Colab] Video generated successfully: {output_mp4} ({os.path.getsize(output_mp4)/(1024*1024):.2f} MB)")
    return output_mp4

if __name__ == "__main__":
    generate_case_video()
