import requests
import os
from dotenv import load_dotenv

load_dotenv()

NFT_STORAGE_API = os.getenv("NFT_STORAGE_API")

def upload_to_ipfs(file_path):
    headers = {"Authorization": f"Bearer {NFT_STORAGE_API}"}
    with open(file_path, "rb") as f:
        files = {"file": f}
        res = requests.post("https://api.nft.storage/upload", headers=headers, files=files)
        res.raise_for_status()
        cid = res.json()["value"]["cid"]
        return f"https://ipfs.io/ipfs/{cid}"
