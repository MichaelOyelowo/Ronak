import re
import json
import glob
import sys

HTML_GLOB = "*.html"

def extract_jsonld(html_text):
    pattern = re.compile(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.DOTALL | re.IGNORECASE)
    return pattern.findall(html_text)

def check_required(obj, filename, idx):
    issues = []
    t = obj.get('@type') if isinstance(obj, dict) else None
    if not t and isinstance(obj, list):
        # array of nodes
        for i, item in enumerate(obj):
            issues += check_required(item, filename, f"{idx}[{i}]")
        return issues

    if not t:
        issues.append((filename, idx, 'unknown', 'missing @type'))
        return issues

    # normalize
    if isinstance(t, list):
        t = t[0]

    if t == 'Product':
        if not obj.get('name'):
            issues.append((filename, idx, t, 'missing name'))
        if not obj.get('image'):
            issues.append((filename, idx, t, 'missing image'))
        offers = obj.get('offers')
        if not offers:
            issues.append((filename, idx, t, 'missing offers'))
        else:
            if isinstance(offers, dict):
                if not offers.get('price') or not offers.get('priceCurrency'):
                    issues.append((filename, idx, t, 'offers missing price or priceCurrency'))
    if t == 'FAQPage':
        if not obj.get('mainEntity'):
            issues.append((filename, idx, t, 'missing mainEntity'))
    if t in ('LocalBusiness','Store'):
        addr = obj.get('address')
        if not addr or not addr.get('streetAddress'):
            issues.append((filename, idx, t, 'address.streetAddress missing'))
    if t == 'WebSite':
        if not obj.get('potentialAction'):
            issues.append((filename, idx, t, 'missing potentialAction (SearchAction)'))
    if t == 'BreadcrumbList':
        items = obj.get('itemListElement')
        if not items:
            issues.append((filename, idx, t, 'missing itemListElement'))
    if t == 'CollectionPage' or t == 'ItemList':
        items = obj.get('mainEntity') or obj.get('itemListElement')
        if not items:
            issues.append((filename, idx, t, 'missing itemListElement/mainEntity'))

    return issues

def main():
    files = glob.glob(HTML_GLOB)
    total_issues = []
    print('Scanning HTML files for JSON-LD...')
    for f in files:
        try:
            with open(f, 'r', encoding='utf-8') as fh:
                text = fh.read()
        except Exception as e:
            print('Failed to read', f, e)
            continue
        blocks = extract_jsonld(text)
        if not blocks:
            continue
        for idx, blk in enumerate(blocks, start=1):
            blk = blk.strip()
            try:
                data = json.loads(blk)
            except Exception as e:
                total_issues.append((f, idx, 'JSON', f'JSON parse error: {e}'))
                continue
            # data may be dict or list
            if isinstance(data, list):
                for i, item in enumerate(data):
                    total_issues += check_required(item, f, f'{idx}[{i}]')
            else:
                total_issues += check_required(data, f, idx)

    if not total_issues:
        print('No obvious JSON-LD issues found for the checked rules.')
        return

    print('\nFound issues:')
    for it in total_issues:
        print(f' - File: {it[0]} | Block: {it[1]} | Type: {it[2]} | Issue: {it[3]}')

if __name__ == '__main__':
    main()
