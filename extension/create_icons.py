from PIL import Image, ImageDraw
import os


def create_icon(size, filename):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    gradient_start = (102, 126, 234)
    gradient_end = (118, 75, 162)

    for y in range(size):
        ratio = y / size
        r = int(gradient_start[0] * (1 - ratio) + gradient_end[0] * ratio)
        g = int(gradient_start[1] * (1 - ratio) + gradient_end[1] * ratio)
        b = int(gradient_start[2] * (1 - ratio) + gradient_end[2] * ratio)
        draw.rectangle([(0, y), (size, y + 1)], fill=(r, g, b, 255))

    circle_radius = size // 3
    circle_center = (size // 2, size // 2)
    draw.ellipse(
        [
            (circle_center[0] - circle_radius, circle_center[1] - circle_radius),
            (circle_center[0] + circle_radius, circle_center[1] + circle_radius),
        ],
        fill=(255, 255, 255, 255),
    )

    inner_radius = circle_radius - (size // 12)
    draw.ellipse(
        [
            (circle_center[0] - inner_radius, circle_center[1] - inner_radius),
            (circle_center[0] + inner_radius, circle_center[1] + inner_radius),
        ],
        fill=(102, 126, 234, 255),
    )

    handle_width = size // 8
    handle_length = size // 3
    handle_start = (
        circle_center[0] + int(inner_radius * 0.7),
        circle_center[1] + int(inner_radius * 0.7),
    )
    handle_end = (handle_start[0] + handle_length, handle_start[1] + handle_length)

    draw.line([handle_start, handle_end], fill=(255, 255, 255, 255), width=handle_width)

    draw.ellipse(
        [
            (handle_end[0] - handle_width // 2, handle_end[1] - handle_width // 2),
            (handle_end[0] + handle_width // 2, handle_end[1] + handle_width // 2),
        ],
        fill=(255, 255, 255, 255),
    )

    img.save(filename, "PNG")
    print(f"Created {filename}")


os.makedirs("icons", exist_ok=True)

create_icon(16, "icons/icon16.png")
create_icon(48, "icons/icon48.png")
create_icon(128, "icons/icon128.png")

print("All icons created successfully!")
